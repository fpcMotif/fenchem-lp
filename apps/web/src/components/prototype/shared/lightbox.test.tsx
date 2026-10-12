import { act, fireEvent, render } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";

import { LightboxDialog, useLightbox } from "./lightbox";

const PHOTOS = [
  { id: "gate", large: "/gate.jpg" },
  { id: "lab", large: "/lab.jpg" },
  { id: "hall", large: "/hall.jpg" },
];

function Gallery() {
  const lightbox = useLightbox(PHOTOS.length);
  return (
    <>
      <button type="button" onClick={() => lightbox.open(1)}>
        open lab
      </button>
      <LightboxDialog lightbox={lightbox} items={PHOTOS}>
        {(photo, index) => (
          <p>
            {photo.id} {index} {lightbox.stepped ? "stepped" : "opened"}
          </p>
        )}
      </LightboxDialog>
    </>
  );
}

beforeAll(() => {
  HTMLDialogElement.prototype.showModal = function showModal(this: HTMLDialogElement) {
    this.open = true;
  };
  HTMLDialogElement.prototype.close = function close(this: HTMLDialogElement) {
    this.open = false;
    this.dispatchEvent(new Event("close"));
  };
});

afterEach(() => vi.unstubAllGlobals());

describe("LightboxDialog", () => {
  it("opens on the chosen photo and steps with wrapping arrow keys", () => {
    const { getByRole, getByText } = render(<Gallery />);
    const dialog = getByRole("dialog", { hidden: true });
    expect(dialog).toHaveProperty("open", false);

    fireEvent.click(getByText("open lab"));
    expect(dialog).toHaveProperty("open", true);
    expect(dialog.textContent).toBe("lab 1 opened");

    fireEvent.keyDown(dialog, { key: "ArrowRight" });
    fireEvent.keyDown(dialog, { key: "ArrowRight" });
    expect(dialog.textContent).toBe("gate 0 stepped");

    fireEvent.keyDown(dialog, { key: "ArrowLeft" });
    expect(dialog.textContent).toBe("hall 2 stepped");
  });

  it("clears the photo when the dialog closes natively", () => {
    const { getByRole, getByText } = render(<Gallery />);
    const dialog = getByRole("dialog", { hidden: true }) as HTMLDialogElement;
    fireEvent.click(getByText("open lab"));

    act(() => dialog.close());
    expect(dialog.textContent).toBe("");
    expect(dialog.open).toBe(false);
  });

  it("preloads both neighbours of the open photo", () => {
    const sources: string[] = [];
    vi.stubGlobal(
      "Image",
      class {
        set src(value: string) {
          sources.push(value);
        }
      },
    );
    const { getByText } = render(<Gallery />);
    fireEvent.click(getByText("open lab"));
    expect(sources).toEqual(["/hall.jpg", "/gate.jpg"]);
  });
});
