import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import type { ReactNode, Ref } from "react";
import { LightboxStage } from "./lightbox-stage";

export function CampusLightbox({
  dialogRef,
  photo,
  stepped,
  onClose,
  onStep,
  styles,
  children,
}: {
  dialogRef: Ref<HTMLDialogElement>;
  photo: { id: string; large: string; alt: string; caption: string } | null;
  stepped: boolean;
  onClose: () => void;
  onStep: (delta: number) => void;
  styles: Record<
    "dialog" | "stage" | "figure" | "figureStep" | "figureOpen" | "image" | "caption",
    StyleXStyles
  >;
  children: ReactNode;
}) {
  return (
    <dialog
      ref={dialogRef}
      aria-label="园区照片"
      onClose={onClose}
      onKeyDown={(event) => {
        if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
        event.preventDefault();
        event.stopPropagation();
        onStep(event.key === "ArrowRight" ? 1 : -1);
      }}
      {...stylex.props(styles.dialog)}
    >
      {photo ? (
        <>
          <LightboxStage onClose={onClose} sx={styles.stage}>
            <figure
              key={photo.id}
              {...stylex.props(styles.figure, stepped ? styles.figureStep : styles.figureOpen)}
            >
              <img src={photo.large} alt={photo.alt} {...stylex.props(styles.image)} />
              <figcaption {...stylex.props(styles.caption)}>{photo.caption}</figcaption>
            </figure>
          </LightboxStage>
          {children}
        </>
      ) : null}
    </dialog>
  );
}
