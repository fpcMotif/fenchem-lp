import { createSignal, onSettled, type Accessor } from "solid-js";

export function useActiveSection(ids: readonly string[]): Accessor<string | undefined> {
  const [active, setActive] = createSignal<string | undefined>(ids[0]);
  onSettled(() => {
    const crossing = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) crossing.add(entry.target.id);
          else crossing.delete(entry.target.id);
        }
        setActive(ids.find((id) => crossing.has(id)));
      },
      { rootMargin: "-40% 0px -59% 0px" },
    );
    for (const id of ids) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  });
  return active;
}
