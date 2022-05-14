export default {
    plugins: [
        '~/plugins/bootstrap.js'
    ],
    modules: [
        '@nuxtjs/axios'
    ],
    axios: {
        baseUrl: 'http://localhost:8080'
    },
    css: [
        '~/assets/styles/main.css'
    ]
}