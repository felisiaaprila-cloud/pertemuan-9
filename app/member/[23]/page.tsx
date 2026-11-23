import Link from 'next/link';
import { Suspense } from 'react';

async function MemberContent({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    return (
        <div>
            <h1>Member Page</h1>
            <p>This is the page for member with ID: {id}</p>
            <p>Use the navigation bar to explore other members.</p>
            <p>
                Check out <Link href="/member">Member Home</Link> for more members.
            </p>
        </div>
    );
}

const MemberPage = ({
    params,
}: {
    params: Promise<{ id: string }>;
}) => {
    return (
        <Suspense fallback={<div>Loading member...</div>}>
            <MemberContent params={params} />
        </Suspense>
    );
};

export default MemberPage;