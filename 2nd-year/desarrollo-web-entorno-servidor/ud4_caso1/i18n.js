const translations = {
  /* =================== */
  /*        INGLÉS       */
  /* =================== */
  en: {
    /* HEADER */
    brand_tagline: "Digital development with creative judgement",
    nav_index: "Home",
    nav_sobre: "About",
    nav_noticias: "News",
    nav_tienda: "Shop",
    lang_toggle: "EN",

    /* FOOTER */
    footer_contact: "Contact",
    footer_address: "<b>Address:</b> 123 Fake Street, 18028, Madrid" + "<br><b>Phone:</b> +34 685-854-875<br><b>E-mail:</b> bestteam@thebest.com",
    footer_other_links: "Other useful links",
    footer_link1: "Fake link 1",
    footer_link2: "Fake link 2",
    footer_link3: "Fake link 3",

    /* CARRITO */
    cart_empty: "Empty cart",
    cart_products_label: "Products in the cart:",
    cart_view: "View cart",

    /* CONTENT */
    /* HOME */
    home_title: "Why we are the best",

    /* TIENDA */
    cart_title: "Cart",
    catalog_title: "Catalog",
    buscar_label: "<b>Search:</b>",
    buscar: "Search",
    resultados_title: "Results",

    /* SOBRE */
    about_title: "<b>About our Team</b>",
    about_sentence1: "We are a dedicated group of gaming enthusiasts committed to providing the best gaming experience. Our team consists of professional players, developers, and support staff who work tirelessly to ensure our community thrives.",
    about_sentence2: "Founded in 2010, we have grown from a small group of friends to a large community with members from all around the world. Our mission is to create a welcoming environment where gamers can connect, compete, and collaborate.",
    about_sentence3: "We believe in the power of gaming to bring people together and foster friendships. Whether you're a casual player or a competitive gamer, there's a place for you in our community.",
    values_title: "Our Core Values",
    value_community: "<b>Community:</b><br>We prioritize building a strong, inclusive community where everyone feels welcome.",
    value_integrity: "<b>Integrity:</b><br> We uphold the highest standards of honesty and fairness in all our interactions.",
    value_excellence: "<b>Excellence:</b><br> We strive for excellence in everything we do, from gameplay to customer support.",
    value_innovation: "<b>Innovation:</b><br> We embrace new ideas and technologies to enhance the gaming experience.",
  
    /* NOTICIAS */
    page_title_news: "Videogame news and reviews",
    clave_label: "Keyword:",
    cat_label: "Category:",
    cat_all: "All",
    cat_mmorpg: "MMORPG",
    cat_novela_visual: "Visual Novel",
    buscar_noticia: "Search",
    no_results: "No articles found.",
    date_label: "Date:",

  },

  /* =================== */
  /*       ESPAÑOL       */
  /* =================== */
  es: {

    /* HEADER */
    nav_index: "Inicio",
    nav_sobre: "Sobre mí",
    nav_noticias: "Noticias",
    nav_tienda: "Tienda",
    lang_toggle: "ES",
    
    /* FOOTER */
    footer_contact: "Contacto",
    footer_address: "<b>Dirección:</b> Calle falsa 123, 18028, Madrid" + "<br><b>Teléfono:</b> +34 685-854-875<br><b>E-mail:</b> bestteam@thebest.com",
    footer_other_links: "Otros enlaces de interés",
    footer_link1: "Enlace falso 1",
    footer_link2: "Enlace falso 2",
    footer_link3: "Enlace falso 3",


    /* CARRITO */
    cart_empty: "Carrito vacío",
    cart_products_label: "Productos en el carrito:",
    cart_view: "Ver carrito",
    
    /* CONTENT */
    /* HOME */
    home_title: "Por qué somos los mejores",

    /* TIENDA */
    cart_title: "Carrito",
    catalog_title: "Catálogo",
    buscar_label: "<b>Buscar:</b>",
    buscar: "Buscar",
    resultados_title: "Resultados",

    /* SOBRE */
    about_title: "<b>Sobre nuestro equipo</b>",
    about_sentence1: "Somos un grupo dedicado de entusiastas de los videojuegos comprometidos a brindar la mejor experiencia de juego. Nuestro equipo está formado por jugadores profesionales, desarrolladores y personal de apoyo que trabajan incansablemente para garantizar que nuestra comunidad prospere.",
    about_sentence2: "Fundada en 2010, hemos crecido de un pequeño grupo de amigos a una gran comunidad con miembros de todo el mundo. Nuestra misión es crear un ambiente acogedor donde los jugadores puedan conectarse, competir y colaborar.",
    about_sentence3: "Creemos en el poder de los videojuegos para unir a las personas y fomentar amistades. Ya seas un jugador casual o un gamer competitivo, hay un lugar para ti en nuestra comunidad.",
    values_title: "Nuestros valores fundamentales",
    value_community: "<b>Comunidad:</b><br>Priorizamos la construcción de una comunidad fuerte e inclusiva donde todos se sientan bienvenidos.",
    value_integrity: "<b>Integridad:</b><br>Mantenemos los más altos estándares de honestidad y equidad en todas nuestras interacciones.",
    value_excellence: "<b>Excelencia:</b><br>Nos esforzamos por la excelencia en todo lo que hacemos, desde el juego hasta el soporte al cliente.",
    value_innovation: "<b>Innovación:</b><br>Adoptamos nuevas ideas y tecnologías para mejorar la experiencia de juego.",
 
    /* NOTICIAS */
    page_title_news: "Video game news and reviews",
    clave_label: "Palabra clave:",
    cat_label: "Categoría:",
    cat_all: "Todas",
    cat_mmorpg: "MMORPG",
    cat_novela_visual: "Novela Visual",
    buscar_noticia: "Buscar",
    no_results: "No se han encontrado artículos.",
    date_label: "Fecha:"
 
  }
};

function applyTranslations() {
  const lang = localStorage.getItem('idioma') || 'es';
  const dict = translations[lang];
  for (const key in dict) {
    const el = document.getElementById(key);
    if (el) el.innerHTML = dict[key];
  }
}
document.addEventListener('DOMContentLoaded', applyTranslations);
