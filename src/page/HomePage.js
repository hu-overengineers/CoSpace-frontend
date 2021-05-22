import React from 'react';
import PostFeedLayout from "../layout/PostFeedLayout";
import PostFeedSwitch from "../router/PostFeedSwitch";


export default function HomePage() {
    return (
        <PostFeedLayout>
            <PostFeedSwitch/>
        </PostFeedLayout>
    );
}
