/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {hostname:"wary-mink-225.convex.cloud"},
            {hostname:"oaidalleapiprodscus.blob.core.windows.net"}
        ]
    }
};

export default nextConfig;
