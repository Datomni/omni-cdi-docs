import React from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

type ComponentItem = {
  title: string;
  description: string;
  icon: string;
  details: string[];
  comingSoon?: boolean;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Full Control of Data and Infrastructure',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        <div className={styles.featureDescription}>
          Run a private CDP in your own cloud environment to ensure your data remains secure and accessible only to you.
        </div>
      </>
    ),
  },
  {
    title: 'Significantly Reduced CDP Costs',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        <div className={styles.featureDescription}>
          Why care about preallocated unique user counts that CDPs assign? Omni CDI processes as many users as you have in your private setup.
        </div>
      </>
    ),
  },
  {
    title: 'Customizability and Containerization',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        <div className={styles.featureDescription}>
          Quickly spin up and down any part of your customer data infrastructure and customize it as needed.
        </div>
      </>
    ),
  },
];

const ComponentList = [
  {
    title: 'Complete Customer Data Infrastructure',
    description: 'A comprehensive, modular solution that covers every aspect of modern customer data management.',
    components: [
      {
        title: 'Tracking Strategy & Protocols',
        description: 'Complete tracking documentation including protocols and schemas',
        icon: '📊',
        details: [
          'Standardized tracking protocols',
          'Event schema documentation',
          'Custom implementation guides'
        ]
      },
      {
        title: 'Server-Side Event Tracking Libraries',
        description: 'Server-side tracking libraries for reliable data collection',
        icon: '⚙️',
        details: [
          'Node.js tracking library',
          'PHP tracking library',
          'Server-side validation and debugging tools',
          'Data quality enforcement',
          'Built-in privacy controls',
          'Automatic data enrichment'
        ],
        comingSoon: true
      },
      {
        title: 'Identity Resolution',
        description: 'Advanced identity management and customer profile unification',
        icon: '🔍',
        details: [
          'Cross-device tracking',
          'Identity graph management',
          'Profile merging rules',
          'Custom identity resolution logic'
        ],
        comingSoon: true
      },
      {
        title: 'Data Collection & Processing',
        description: 'Containerized collectors for reliable data collection',
        icon: '🔄',
        details: [
          'Dockerized collectors',
          'High-availability setup',
          'Real-time data processing',
          'Scalable architecture'
        ]
      },
      {
        title: 'Infrastructure',
        description: 'Comprehensive data pipeline management',
        icon: '⚡',
        details: [
          'Real-time processing pipelines',
          'Warehouse integration',
          'Terraform deployment templates',
          'Infrastructure-as-Code examples'
        ]
      },
      {
        title: 'Activation',
        description: 'Enterprise-grade tag management and activation',
        icon: '🚀',
        details: [
          'Google Tag Manager server-side',
          'Custom tag templates',
          'Tag monitoring and alerts',
          'Performance optimization'
        ]
      },
      {
        title: 'ETL/ELT',
        description: 'Modern data extraction and transformation',
        icon: '🔧',
        details: [
          'Marketing data extraction',
          'Custom API integrations',
          'Automated workflows',
          'Data synchronization'
        ]
      },
      {
        title: 'Data Modeling',
        description: 'Transform raw data into analytics-ready models',
        icon: '📊',
        details: [
          'dbt transformation templates',
          'SQL modeling patterns',
          'Data quality tests',
          'Documentation automation'
        ],
        comingSoon: true
      },
      {
        title: 'Reporting',
        description: 'Ready-to-use dashboards and visualization tools',
        icon: '📈',
        details: [
          'Metabase integration',
          'Looker templates',
          'Custom dashboard library',
          'Real-time analytics views'
        ]
      },
      {
        title: 'Growth Automation',
        description: 'Streamline and automate marketing operations',
        icon: '⚡',
        details: [
          'End-to-end workflow automation',
          'Native integration with Omni CDI components',
          'Marketing operation templates',
          'Growth process automation',
          'Automated data-driven decisions'
        ],
        comingSoon: true
      },
      {
        title: 'Performance Optimization',
        description: 'Maximize ROI through automated optimization',
        icon: '📈',
        details: [
          'Automated media spend optimization',
          'High-frequency testing framework',
          'Creative performance tracking',
          'A/B testing automation',
          'Real-time performance monitoring',
          'Advertising automation scripts',
          'Dynamic audience management',
          'Cross-platform audience sync'
        ],
        comingSoon: true
      },
      {
        title: 'Documentation & Support',
        description: 'Comprehensive guides and implementation support',
        icon: '📚',
        details: [
          'Technical documentation',
          'Implementation guides',
          'Best practices',
          'Support channels'
        ]
      }
    ]
  }
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className={styles.featureCard}>
        <div className={styles.featureImageContainer}>
          <Svg className={styles.featureSvg} role="img" />
        </div>
        <div className={styles.featureContent}>
          <Heading as="h3">{title}</Heading>
          {description}
        </div>
      </div>
    </div>
  );
}

function ComponentSection({title, description, components}) {
  return (
    <div className={styles.componentSection}>
      <div className={styles.componentHeader}>
        <Heading as="h2">{title}</Heading>
        <p className={styles.componentDescription}>{description}</p>
      </div>
      <div className={styles.componentGrid}>
        {components.map((component, idx) => (
          <div key={idx} className={styles.componentCard}>
            {component.comingSoon && (
              <div className={styles.comingSoonBadge}>Coming Soon</div>
            )}
            <div className={clsx(
              styles.componentContent,
              component.comingSoon && styles.comingSoonComponent
            )}>
              <div className={styles.componentIcon}>{component.icon}</div>
              <h3>{component.title}</h3>
              <p>{component.description}</p>
              <ul className={styles.componentDetails}>
                {component.details.map((detail, detailIdx) => (
                  <li key={detailIdx}>{detail}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
        {ComponentList.map((section, idx) => (
          <ComponentSection key={idx} {...section} />
        ))}
      </div>
    </section>
  );
}
