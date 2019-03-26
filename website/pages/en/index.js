/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require("react");

const CompLibrary = require("../../core/CompLibrary.js");

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

class HomeSplash extends React.Component {
  render() {
    const { siteConfig, language = "" } = this.props;
    const { baseUrl, docsUrl } = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ""}`;
    const langPart = `${language ? `${language}/` : ""}`;
    const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

    const SplashContainer = props => (
      <div className="homeContainer">
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">{props.children}</div>
        </div>
      </div>
    );

    const Logo = props => (
      <div className="projectLogo">
        <img src={props.img_src} alt="Project Logo" />
      </div>
    );

    const ProjectTitle = () => (
      <h2 className="projectTitle">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <img
            src={`${baseUrl}img/laconia.svg`}
            alt="Project Logo"
            height="100"
            style={{ marginRight: "18px" }}
          />
          {siteConfig.title}
        </div>
        <small>{siteConfig.tagline}</small>
      </h2>
    );

    const PromoSection = props => (
      <div className="section promoSection">
        <div className="promoRow">
          <div className="pluginRowBlock">{props.children}</div>
        </div>
      </div>
    );

    const Button = props => (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={props.href} target={props.target}>
          {props.children}
        </a>
      </div>
    );

    return (
      <SplashContainer>
        {/* <Logo img_src={`${baseUrl}img/laconia.svg`} /> */}
        <div className="inner">
          <ProjectTitle siteConfig={siteConfig} />
          <PromoSection>
            <Button href={docUrl("introduction/getting-started")}>
              GET STARTED
            </Button>
          </PromoSection>
        </div>
      </SplashContainer>
    );
  }
}

class Index extends React.Component {
  render() {
    const { config: siteConfig, language = "" } = this.props;
    const { baseUrl } = siteConfig;

    const Block = props => (
      <Container
        // padding={["bottom", "top"]}
        padding={["bottom"]}
        id={props.id}
        background={props.background}
      >
        <GridBlock
          align="center"
          contents={props.children}
          layout={props.layout}
        />
      </Container>
    );

    const FeatureCallout = () => (
      <div
        className="productShowcaseSection paddingBottom"
        style={{ textAlign: "center" }}
      >
        <h2>Feature Callout</h2>
        <MarkdownBlock>These are features of this project</MarkdownBlock>
      </div>
    );

    const TryOut = () => (
      <Block id="try">
        {[
          {
            content: "Talk about trying this out",
            image: `${baseUrl}img/docusaurus.svg`,
            imageAlign: "left",
            title: "Try it Out"
          }
        ]}
      </Block>
    );

    const Description = () => (
      <Block background="dark">
        {[
          {
            content:
              "This is another description of how this project is useful",
            image: `${baseUrl}img/docusaurus.svg`,
            imageAlign: "right",
            title: "Description"
          }
        ]}
      </Block>
    );

    const LearnHow = () => (
      <Block background="light">
        {[
          {
            content: "Talk about learning how to use this",
            image: `${baseUrl}img/docusaurus.svg`,
            imageAlign: "right",
            title: "Learn How"
          }
        ]}
      </Block>
    );

    const Features = () => (
      <Block layout="threeColumn">
        {[
          {
            content:
              "Laconia allows you to write serverless functions in Hexagonal Architecture easily. " +
              "All of your serverless functions will have more consistent patterns that are testable, maintainable, and loosely coupled.",
            image: `${baseUrl}img/noun_Modularity_2129357.svg`,
            imageAlign: "top",
            title: "Hexagonal"
          },
          {
            content:
              "Never be forced to inherit any Laconia-specific component in your application code. " +
              "Everything that you write will be plain objects and functions.",
            image: `${baseUrl}img/noun_Unlock_1539479.svg`,
            imageAlign: "top",
            title: "Non-intrusive"
          },
          {
            content:
              "Laconia is not a generic framework, it is specialised in serverless. " +
              "This allows Laconia to enable serverless specific best practices and deal with serverless specific issues.",
            image: `${baseUrl}img/noun_Cloud_2326588.svg`,
            imageAlign: "top",
            title: "Focused"
          },
          {
            content:
              "Using small and simple dependencies is the key to performant serverless functions. Laconia is designed with that principle in mind.",
            image: `${baseUrl}img/noun_feather_2332226.svg`,
            imageAlign: "top",
            title: "Lightweight"
          },
          {
            content:
              "Laconia lays strong emphasis on code quality and high test coverage to ensure its seamless use and continued maintenance.",
            image: `${baseUrl}img/noun_quality_685084.svg`,
            imageAlign: "top",
            title: "Quality"
          },
          {
            content:
              "Use Laconia with your favourite serverless deployment tools. Laconia is created to help more on the application side of serverless development.",
            image: `${baseUrl}img/noun_modular_858985.svg`,
            imageAlign: "top",
            title: "Versatile"
          }
        ]}
      </Block>
    );

    const Showcase = () => {
      if ((siteConfig.users || []).length === 0) {
        return null;
      }

      const showcase = siteConfig.users
        .filter(user => user.pinned)
        .map(user => (
          <a href={user.infoLink} key={user.infoLink}>
            <img src={user.image} alt={user.caption} title={user.caption} />
          </a>
        ));

      const pageUrl = page => baseUrl + (language ? `${language}/` : "") + page;

      return (
        <div className="productShowcaseSection paddingBottom">
          <h2>Who is Using This?</h2>
          <p>This project is used by all these people</p>
          <div className="logos">{showcase}</div>
          <div className="more-users">
            <a className="button" href={pageUrl("users.html")}>
              More {siteConfig.title} Users
            </a>
          </div>
        </div>
      );
    };

    return (
      <div>
        <HomeSplash siteConfig={siteConfig} language={language} />
        <div className="mainContainer">
          <Features />
          {/*<FeatureCallout />
          <LearnHow />
          <TryOut />
          <Description />
          <Showcase /> */}
        </div>
      </div>
    );
  }
}

module.exports = Index;
