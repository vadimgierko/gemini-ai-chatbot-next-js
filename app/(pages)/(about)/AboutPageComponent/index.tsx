import ConditionalSignInSection from "./ConditionalSignInSection";
import { ABOUT_PAGE_CONTENT, APP_NAME } from "./content";

export default function AboutPageComponent() {
    return (
        <>
            <header className="text-center">
                <h1 className="app-title">{ABOUT_PAGE_CONTENT.title}</h1>
                <p className="app-description">{ABOUT_PAGE_CONTENT.description}</p>
                <ConditionalSignInSection />
                <hr />
            </header>

            <section className="app-features text-center">
                <h2>{APP_NAME} Features</h2>
                <ul
                    style={{
                        listStyle: "none",
                        padding: 0,
                        display: "flex",
                        justifyContent: "center",
                        flexWrap: "wrap"
                    }}
                >
                    {
                        ABOUT_PAGE_CONTENT
                            .features
                            .map(feature => (
                                <li
                                    key={feature.title}
                                    className="text-center p-3"
                                    style={{ width: 300 }}
                                >
                                    <feature.Icon size={50} className="mb-2" />
                                    <h3>{feature.title}</h3>
                                    <p>{feature.description}</p>
                                </li>
                            ))
                    }
                </ul>
            </section>

            <section className="app-technologies text-center">
                <h2 className="">Technologies used to build the app</h2>
                <hr />
                <ul
                    style={{
                        listStyle: "none",
                        padding: 0,
                        display: "flex",
                        justifyContent: "center",
                        flexWrap: "wrap"
                    }}
                >
                    {
                        ABOUT_PAGE_CONTENT
                            .technologies
                            .map(technology => (
                                <li
                                    key={technology.title}
                                    className="text-center p-3"
                                >
                                    <technology.Icon size={50} className="mb-2" />
                                    <h3>{technology.title}</h3>
                                </li>
                            ))
                    }
                </ul>
            </section>
        </>
    );
}