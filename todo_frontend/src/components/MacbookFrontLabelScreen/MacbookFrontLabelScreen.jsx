import React from 'react';
import './MacbookFrontLabelScreen.css';

/**
 * PUBLIC_INTERFACE
 * MacbookFrontLabelScreen
 * This component replicates the Figma-extracted "MacBook Pro 16-inch Space Black Front label" screen
 * using JSX and CSS. Styles are adapted from assets/screen-60-4.html and assets/screen-60-4.css
 * and tokenized through assets/common.css (imported in the CSS file).
 *
 * Notes on adaptation:
 * - Absolute positioning in the original HTML has been mostly converted to flexible layout
 *   with CSS grid and relative wrappers where possible to improve responsiveness.
 * - Pixel-perfect 1:1 alignment for all elements may not be fully achievable due to layout differences
 *   in React's DOM flow and responsive handling. Any tiny shifts are annotated in code comments.
 * - Local asset references should be added under public/ if any images were referenced.
 */
function MacbookFrontLabelScreen() {
  return (
    <div className="screen60 container">
      {/* Header / Hero Section */}
      <header className="screen60__header surface shadow-4" role="banner">
        <div className="screen60__headerInner">
          <div className="screen60__titles">
            <h1 className="screen60__title">MacBook Pro 16-inch</h1>
            <p className="screen60__subtitle">Space Black • Front label</p>
          </div>
          {/* Theme toggle placeholder (if needed hook into app-level toggle) */}
          <button
            type="button"
            className="screen60__btn"
            aria-label="Theme toggle (uses app-level control)"
            title="Theme toggle (uses app-level control)"
            onClick={() => {
              // Delegating theme change to the app’s global toggle is recommended.
              // This button is decorative per the design and left as a no-op here.
            }}
          >
            🌙 Dark
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="screen60__main" role="main">
        <section className="screen60__card surface shadow-5" aria-labelledby="screen60-section-1">
          <h2 id="screen60-section-1" className="screen60__sectionTitle">
            Front Label Overview
          </h2>
          <div className="screen60__row">
            <div className="screen60__box screen60__box--pink">Primary Label • Tokenized</div>
            <div className="screen60__box screen60__box--amber">Contrast Label • Amber</div>
          </div>
        </section>

        <section className="screen60__card surface shadow-5" aria-labelledby="screen60-section-2">
          <h2 id="screen60-section-2" className="screen60__sectionTitle">Typography Samples</h2>
          <p className="screen60__type screen60__type--xl">Label XL • Bold</p>
          <p className="screen60__type screen60__type--lg">Label LG • Bold</p>
          <p className="screen60__type screen60__type--md">Label MD • Extra Bold</p>
          <p className="screen60__type screen60__type--sm">Label SM • Semibold</p>
        </section>
      </main>

      <footer className="screen60__footer" role="contentinfo">
        <small>Design tokens from assets/common.css applied</small>
      </footer>
    </div>
  );
}

export default MacbookFrontLabelScreen;
