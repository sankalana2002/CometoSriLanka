import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    en: {
        translation: {
            "welcome": "Come to Sri Lanka",
            "subtitle": "Experience the pearl of the Indian Ocean without the hassle.",
            "calculator_title": "Trip Budget Estimator",
            "duration": "Duration (Days)",
            "travelers": "Number of Travelers",
            "style": "Travel Style",
            "total": "Estimated Total",
            "footer": "© 2026 Come to Sri Lanka. All rights reserved.",
            "destinations_title": "Destination Guides & Stays",
            "loading": "Loading listings...",
            "book_now": "Book Now",
            "per_night": "/night"
        }
    },
    cn: {
        translation: {
            "welcome": "来到斯里兰卡",
            "subtitle": "体验印度洋的明珠，轻松无忧。",
            "calculator_title": "旅行预算估算器",
            "duration": "持续时间（天）",
            "travelers": "旅客人数",
            "style": "旅行方式",
            "total": "预计总额",
            "footer": "© 2026 来到斯里兰卡。保留所有权利。",
            "destinations_title": "目的地指南与住宿",
            "loading": "正在加载列表...",
            "book_now": "立即预订",
            "per_night": "/晚"
        }
    },
    es: {
        translation: {
            "welcome": "Ven a Sri Lanka",
            "subtitle": "Experimenta la perla del Océano Índico sin complicaciones.",
            "calculator_title": "Estimador de Presupuesto de Viaje",
            "duration": "Duración (Días)",
            "travelers": "Número de Viajeros",
            "style": "Estilo de Viaje",
            "total": "Total Estimado",
            "footer": "© 2026 Ven a Sri Lanka. Todos los derechos reservados.",
            "destinations_title": "Guías de Destino y Estancias",
            "loading": "Cargando listados...",
            "book_now": "Reservar Ahora",
            "per_night": "/noche"
        }
    },
    fr: {
        translation: {
            "welcome": "Venez au Sri Lanka",
            "subtitle": "Découvrez la perle de l'océan Indien sans tracas.",
            "calculator_title": "Estimateur de Budget de Voyage",
            "duration": "Durée (Jours)",
            "travelers": "Nombre de Voyageurs",
            "style": "Style de Voyage",
            "total": "Total Estimé",
            "footer": "© 2026 Venez au Sri Lanka. Tous droits réservés.",
            "destinations_title": "Guides de Destination et Séjours",
            "loading": "Chargement des annonces...",
            "book_now": "Réserver Maintenant",
            "per_night": "/nuit"
        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "en", // default language
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
