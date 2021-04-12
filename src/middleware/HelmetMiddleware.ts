import helmet from 'helmet';

const HelmetMiddleware = helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'"],
            scriptSrc: ["'self'"],
            reportUri: '/report-violation',
            objectSrc: ["'self'"],
        },
    },
    referrerPolicy: { policy: 'same-origin' },
});

export default HelmetMiddleware;
