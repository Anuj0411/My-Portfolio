import { lazy, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';

import {
  About,
  Contact,
  Experience,
  Hero,
  Impact,
  Navbar,
  Projects,
  Craft,
  BackToTop,
  Footer,
} from './components';
import CosmicClicks from './components/CosmicClicks';

const CosmosCanvas = lazy(() => import('./components/canvas/Cosmos'));

const App = () => {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <div className="relative bg-primary">
          <a href="#main" className="skip-link">
            Skip to main content
          </a>
          <Suspense fallback={null}>
            <CosmosCanvas />
          </Suspense>
          <CosmicClicks />
          <div className="relative z-10">
            <header>
              <Navbar />
            </header>
            <main id="main" tabIndex={-1}>
              <Hero />
              <Impact />
              <About />
              <Experience />
              <Projects />
              <Craft />
              <Contact />
            </main>
            <Footer />
            <BackToTop />
          </div>
        </div>
      </BrowserRouter>
    </MotionConfig>
  );
};

export default App;
