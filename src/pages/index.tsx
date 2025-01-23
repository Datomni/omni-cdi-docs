import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className={styles.heroOverlay} />
      <div className="container">
        <div className={styles.heroContent}>
          <Heading as="h1" className="hero__title">
            Your Customer Data Infrastructure,<br/>
            <span className={styles.highlight}>Your Private Cloud</span>
          </Heading>
          <p className="hero__subtitle">
            Primarily open-source, containerized infrastructure built for private cloud environments, providing complete control over your customer data lifecycle
          </p>
          <div className={styles.heroFeatures}>
            <div className={styles.heroFeature}>
              <span className={styles.featureIcon}>🔒</span>
              <span>Full Data Control</span>
            </div>
            <div className={styles.heroFeature}>
              <span className={styles.featureIcon}>🐳</span>
              <span>Docker-Native</span>
            </div>
            <div className={styles.heroFeature}>
              <span className={styles.featureIcon}>⚡</span>
              <span>Real-time Processing</span>
            </div>
          </div>
          <div className={styles.trustedBy}>
            <div className={styles.trustedByLabel}>
              <span className={styles.featureIcon}>⚡</span>
              <span className={styles.poweringText}>OMNI CDI IS POWERING</span>
              <span className={styles.featureIcon}>⚡</span>
            </div>
            <div className={styles.trustedByLogos}>
              <a href="https://datomni.com" target="_blank" rel="noopener noreferrer" className={styles.trustedByItem}>
                <div className={styles.productBadge}>FLAGSHIP BRAND</div>
                <span className={styles.productName}>Datomni</span>
                <span className={styles.productDesc}>Enterprise Customer Data Infrastructure</span>
                <span className={styles.productMeta}>Products • Services • Solutions</span>
              </a>
              <div className={styles.divider}>
                <span className={styles.featureIcon}>⚡</span>
              </div>
              <a href="https://performance.datomni.com" target="_blank" rel="noopener noreferrer" className={styles.trustedByItem}>
                <div className={styles.productBadge}>PERFORMANCE SUITE</div>
                <span className={styles.productName}>Datomni Performance</span>
                <span className={styles.productDesc}>Datomni Performance Growth</span>
                <span className={styles.productMeta}>Analytics • Activation • Growth</span>
              </a>
            </div>
          </div>
          <div className={styles.buttons}>
            <Link
              className={clsx('button button--lg', styles.primaryButton)}
              to="/docs/intro">
              Get Started
            </Link>
            <Link
              className={clsx('button button--lg', styles.secondaryButton)}
              href="https://calendly.com/datomni-consulting/">
              Schedule Proof of Concept
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className={styles.footerSection}>
      <div className={styles.footerOverlay} />
      <div className={styles.footerContent}>
        <div className={styles.footerColumn}>
          <h3 className={styles.footerTitle}>Products</h3>
          <ul className={styles.footerLinks}>
            <li className={styles.footerLink}>
              <a href="/docs/intro">Documentation</a>
            </li>
            <li className={styles.footerLink}>
              <a href="https://datomni.com">Enterprise Solutions</a>
            </li>
            <li className={styles.footerLink}>
              <a href="https://performance.datomni.com">Performance Suite</a>
            </li>
          </ul>
        </div>
        <div className={styles.footerColumn}>
          <h3 className={styles.footerTitle}>Resources</h3>
          <ul className={styles.footerLinks}>
            <li className={styles.footerLink}>
              <a href="/docs/infrastructure/intro">Infrastructure</a>
            </li>
            <li className={styles.footerLink}>
              <a href="/docs/activation/intro">Activation</a>
            </li>
            <li className={styles.footerLink}>
              <a href="/docs/reporting/intro">Reporting</a>
            </li>
          </ul>
        </div>
        <div className={styles.footerColumn}>
          <h3 className={styles.footerTitle}>Community</h3>
          <ul className={styles.footerLinks}>
            <li className={styles.footerLink}>
              <a href="https://calendly.com/datomni-consulting/">Schedule Demo</a>
            </li>
            <li className={styles.footerLink}>
              <a href="https://www.meetup.com/The-10X-Data-driven-Marketing-Warsaw">Meetup</a>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <div className={styles.footerSocial}>
          <a href="https://datomni.com" className={styles.footerSocialLink}>
            <span>🌐</span>
          </a>
          <a href="https://www.linkedin.com/company/datomni" className={styles.footerSocialLink}>
            <span>💼</span>
          </a>
        </div>
        <p className={styles.copyright}>
          Copyright © {new Date().getFullYear()} Datomni LLC, AI EATS SOFTWARE LLC, Forward Thinking Capital LLC.<br/>
          All rights reserved. Warsaw, Berlin, Kyiv.<br/>
          Built with Docusaurus.
        </p>
      </div>
    </footer>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Datomni | Take control of your customer data`}
      description="Omni CDI is a composable customer data infrastructure for full-lifecycle marketing, designed to run in your private cloud, allowing full control.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
      <Footer />
    </Layout>
  );
}
