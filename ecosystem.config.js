module.exports = {
    apps: [
        {
            name: "next-client",
            script: "node_modules/next/dist/bin/next", // Next.js start script
            args: "start",
            env: {
                NODE_ENV: "production",
                PORT: 3000, // Ensure this matches your Nginx proxy_pass setting
            },
            instances: 1, // Run the app in cluster mode (use "1" for a single instance)
            watch: false,
        },
    ],
};
