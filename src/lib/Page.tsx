import type { ReactNode } from "react";
import { Tools } from "./tools";
import { StudyBanner, StudyDisclosure } from "./study";
import { CREDITS, DATELINE, DESKS, TRENDS, WEEK, WHO_TO_FOLLOW } from "../content";

/**
 * The signed-in shell, after the reference's three columns: a left rail of
 * destinations and a Post control, the page in the centre, and a right
 * rail of search, a card on the week's prizes (where the reference has its
 * subscription card), "What's happening" and "Who to follow", which lists
 * the desks without Follow buttons. Nothing in the shell asks the reader to
 * subscribe, follow, sign up or sign in (CLAUDE.md, Safe Browsing
 * remediation). At phone width the rail becomes a bottom tab bar and the
 * right rail folds under the page. GIFx is a fictional network; the trends
 * are a real snapshot (captures/trends.json) and the posts are the
 * network's own desks.
 */
export const NAV: [string, string, string][] = [["index.html", "Home", "⌂"], ["explore.html", "Explore", "#"], ["notifications", "Notifications", "◔"], ["messages", "Messages", "✉"], ["bookmarks", "Bookmarks", "▭"], ["communities", "Communities", "⚇"], ["premium", "Premium", "✦"], ["profile", "Profile", "◯"]];

export function Page({ current, title, standfirst, children, rightFirst }: { current: string; title: string; standfirst?: string; children: ReactNode; rightFirst?: ReactNode }) {
  return (
    <>
      <a className="skip" href="#content">Skip to content</a>
      <StudyBanner />
      <Tools />
      <div className="app">
        <nav className="rail" aria-label="Sections">
          <a className="wordmark" href="./index.html" aria-label="GIFx home"><span className="wordmark__mark" aria-hidden="true">G</span></a>
          <ul>
            {NAV.map(([href, label, glyph]) => {
              const real = href.endsWith(".html");
              return (
                <li key={href}>
                  {real
                    ? <a href={`./${href}`} aria-current={href === current ? "page" : undefined}><span className="rail__glyph" aria-hidden="true">{glyph}</span><span className="rail__label">{label}</span></a>
                    : <span className="rail__item rail__item--off" aria-disabled="true" title="Not part of this study"><span className="rail__glyph" aria-hidden="true">{glyph}</span><span className="rail__label">{label}</span></span>}
                </li>
              );
            })}
          </ul>
          <a className="btn btn--primary rail__post" href="./index.html#compose">Post</a>
        </nav>

        <div className="frame">
          <main id="content">
            <header className="masthead">
              <h1 className="masthead__title">{title}</h1>
              {standfirst && <p className="masthead__standfirst">{standfirst}</p>}
              <p className="masthead__date">{DATELINE}</p>
            </header>
            {children}
          </main>
        </div>

        <aside className="side" aria-label="What's happening">
          <form className="search" role="search" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="q" className="visually-hidden">Search</label>
            <input id="q" type="search" placeholder="Search" autoComplete="off" />
          </form>
          {rightFirst}
          <section className="card" aria-labelledby="nobelweek-title">
            <h2 id="nobelweek-title" className="card__title">Nobel week</h2>
            <ol className="trends">
              {WEEK.map((d) => (
                <li key={d.day}>
                  <span className="trends__meta">{d.day} · {d.status}</span>
                  <span className="trends__name">{d.prize}</span>
                </li>
              ))}
            </ol>
            <a className="card__more" href="./explore.html#week">Show more</a>
          </section>
          <section className="card" aria-labelledby="trends-title">
            <h2 id="trends-title" className="card__title">What's happening</h2>
            <ol className="trends">
              {TRENDS.us.slice(0, 8).map((t) => (
                <li key={t.rank}>
                  <span className="trends__meta">{t.rank} · Trending in United States</span>
                  <a className="trends__name" href={`./explore.html#${encodeURIComponent(t.name)}`}>{t.name}</a>
                </li>
              ))}
            </ol>
            <a className="card__more" href="./explore.html">Show more</a>
          </section>
          <section className="card" aria-labelledby="follow-title">
            <h2 id="follow-title" className="card__title">Who to follow</h2>
            <ul className="follow">
              {WHO_TO_FOLLOW.map((d) => (
                <li key={d.handle}>
                  <span className={`avatar avatar--${d.tone}`} aria-hidden="true">{d.initial}</span>
                  <span className="follow__who"><strong>{d.name}</strong><span className="muted">@{d.handle}</span><span className="follow__bio">{d.bio}</span></span>
                </li>
              ))}
            </ul>
          </section>
          <p className="side__foot">Desks: {Object.values(DESKS).map((d) => `@${d.handle}`).join(" · ")}. All fictional.</p>
        </aside>
      </div>
      <StudyDisclosure>
        <details className="credits">
          <summary>Photograph credits</summary>
          <ul>{CREDITS.map((p) => <li key={p.src}><a href={p.page}>{p.alt}</a> — {p.credit}, {p.licence}.</li>)}</ul>
        </details>
        <p><strong>Why nothing here links to X.</strong> The pages this study follows, X's home timeline and Explore, are named but not linked: both addresses send a signed-out visitor to X's sign-in, and a page styled after a network that links to that network's sign-in can be flagged as phishing by automated scanners, as the address this series is published at was in October 2026. The addresses are listed in the study's repository.</p>
        <p>Trends snapshot: {TRENDS.source}, {new Date(TRENDS.captured).toLocaleString("en-US", { dateStyle: "long", timeStyle: "short", timeZone: "America/New_York" })} Eastern.</p>
      </StudyDisclosure>
      <nav className="tabbar" aria-label="Sections, phone">
        {NAV.slice(0, 2).map(([href, label]) => <a key={href} href={`./${href}`} aria-current={href === current ? "page" : undefined}>{label}</a>)}
        <a href="./index.html#compose">Post</a>
        <a href="#trends-title">Trends</a>
      </nav>
    </>
  );
}
