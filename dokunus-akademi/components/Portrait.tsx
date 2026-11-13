import { founder, site } from "@/content/site";
import { Mandala } from "./Symbols";

/** Kurucu portresi. content/site.ts → founder.portrait doluysa fotoğraf, değilse monogram çerçevesi. */
export function Portrait() {
  return (
    <div className="portrait-frame">
      <div className="portrait">
        {founder.portrait ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={founder.portrait} alt={`${site.founder} portresi`} />
        ) : (
          <>
            <Mandala className="mandala-bg" />
            <span className="monogram" aria-hidden="true">TD</span>
          </>
        )}
      </div>
      <div className="portrait-caption">
        {site.founder}
        <small>Dokunuş Akademi Kurucusu</small>
      </div>
    </div>
  );
}
