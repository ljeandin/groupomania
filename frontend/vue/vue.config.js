module.exports = {
    css: {
        loaderOptions: {
            sass: {
                additionalData: '@import "./src/styles/styles.scss";',
            },
        },
    },
};
