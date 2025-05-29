import SignInSection from "./components/SignIn/SignInSection";
import getIndexPageContent from "./lib/getIndexPageContent";
import { generateRouteMetadata } from "./lib/metadata";
import { IndexPageContent_Section } from "./types/IndexPage";

export const metadata = generateRouteMetadata({
    isPrivate: false, routeTitle: "About", slug: ""
});

export default function IndexPage() {
    const { HEADER, SECTIONS } = getIndexPageContent();

    return (
        <>
            <header className="text-center">
                <h1 className="app-title">{HEADER.title}</h1>
                <p className="app-description">{HEADER.description}</p>
                <SignInSection />
                <hr />
            </header>

            {
                SECTIONS.map(section =>
                    <IndexPageSection
                        key={"section-" + section.id}
                        section={section}
                    />
                )
            }

            <hr />

            <section id="motivation" className="text-center">
                <h2>Motivation</h2>
                <p>I created this app as an open-source showcase of my current full-stack development skills while also aiming to help other developers.</p>
                <p>Additionally, I wanted to explore the fundamental capabilities and features of the Gemini API.</p>
                <p>I have many ideas for future enhancements and plan to add new features gradually. However, updates will be made only occasionally, as this project serves as a side diversion from my main private project, which will be published soon.</p>
            </section>

            <hr />
        </>
    );
}

function IndexPageSection({ section }: { section: IndexPageContent_Section }) {
    const {
        additionalStyles,
        id,
        items,
        title
    } = section;

    return <section
        id={id}
        className="text-center"
    >
        <h2>{title}</h2>
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
                items.map(item => (
                    <li
                        key={item.title}
                        className="text-center p-3"
                        style={{ ...additionalStyles }}
                    >
                        <item.Icon size={50} className="mb-2" />
                        <h3>{item.title}</h3>
                        {
                            item.description ?
                                <p>{item.description}</p>
                                : null
                        }
                    </li>
                ))
            }
        </ul>
    </section>
}