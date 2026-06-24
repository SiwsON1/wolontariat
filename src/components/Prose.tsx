type ProseProps = {
  html: string;
};

export function Prose({ html }: ProseProps) {
  return (
    <article
      className="prose"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
