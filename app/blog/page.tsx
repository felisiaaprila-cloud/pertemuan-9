
import Link from "next/link";

export default function BlogPage() {
    return (
        <div>
            <h1>Welcome to the Blog Pagel</h1>
            <p>This is where you can find all the latest blog posts.</p>
            <p>Use the navigation bar to explore other sections of the site.</p>
            <p>
                Check out the <Link href="/">Home</Link> page for more information.
            </p>
        </div>
    );
}