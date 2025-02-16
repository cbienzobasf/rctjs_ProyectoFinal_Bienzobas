// Array de productos mock para simular una base de datos
const products = [
  // Sección de productos de la categoría Invitaciones
  {
    name: "Invitación Elegante Dorada", // Nombre del producto
    description: "Invitación de boda en papel perlado con detalles en dorado y caligrafía moderna", // Descripción detallada
    category: "Invitaciones", // Categoría del producto para filtrado
    price: 2500, // Precio por invitación
    stock: 8, // Stock fijo aleatorio
    images: [ // Array con rutas locales de las imágenes del producto
      "https://www.velamor.com/images/product/DJ0002.jpg",
      "https://www.velamor.com/images/product/DJ0002_2.jpg",
      "https://www.velamor.com/images/product/DJ0002_3.jpg"
    ]
  },
  {
    name: "Invitación Rústica",
    description: "Invitación estilo rústico en papel kraft con encaje y cordel",
    category: "Invitaciones",
    price: 2000,
    stock: 5, // Stock fijo aleatorio
    images: [
      "https://www.velamor.com/images/product/WFL0094F_1.jpg",
      "https://www.velamor.com/images/product/WFL0094F_2.jpg",
      "https://www.velamor.com/images/product/WFL0094F_3.jpg"
    ]
  },
  {
    name: "Invitación Minimalista",
    description: "Diseño limpio y moderno en papel mate con tipografía simple",
    category: "Invitaciones",
    price: 1800,
    stock: 10, // Stock fijo aleatorio
    images: [
      "https://www.velamor.com/images/product/WFL0099_1.jpg",
      "https://www.velamor.com/images/product/WFL0099_2.jpg",
      "https://www.velamor.com/images/product/WFL0099_3.jpg"
    ]
  },
  {
    name: "Invitación Floral",
    description: "Diseño con motivos florales en acuarela y papel texturizado",
    category: "Invitaciones",
    price: 3000,
    stock: 3, // Stock fijo aleatorio
    images: [
      "https://http2.mlstatic.com/D_NQ_NP_923631-MLC70959164839_082023-O-sobres-florales-invitaciones-y-tarjetas-de-felicitacio.webp",
      "https://http2.mlstatic.com/D_NQ_NP_995020-MLC70959164831_082023-O-sobres-florales-invitaciones-y-tarjetas-de-felicitacio.webp",
      "https://http2.mlstatic.com/D_NQ_NP_679700-MLC70959164835_082023-O-sobres-florales-invitaciones-y-tarjetas-de-felicitacio.webp"
    ]
  },
  {
    name: "Invitación Digital",
    description: "Invitación digital personalizada para envío por WhatsApp o email",
    category: "Invitaciones",
    price: 1500,
    stock: 15, // Stock fijo aleatorio
    images: [
      "https://http2.mlstatic.com/D_NQ_NP_2X_857334-MLC72368535600_102023-F-invitacion-digital-matrimonio-boda-personalizada.webp",
      "https://http2.mlstatic.com/D_NQ_NP_2X_789680-MLC72888617380_112023-F-invitacion-digital-matrimonio-boda-personalizada.webp",
      "https://http2.mlstatic.com/D_NQ_NP_2X_896728-MLC72745627600_112023-F-invitacion-digital-matrimonio-boda-personalizada.webp"
    ]
  },

  // Decoración
  {
    name: "Centro de Mesa Floral",
    description: "Arreglo floral con rosas y velas para centro de mesa",
    category: "Decoración",
    price: 45000, // Centro de mesa floral
    stock: 6, // Stock fijo aleatorio
    images: [
      "https://cdn0.bodas.net/article-vendor/15927/original/1280/jpeg/centro-rodajas-madera_1_115927-157565479634631.webp",
      "https://encactus.cl/wp-content/uploads/2019/07/centromesa1_encactus.jpg",
      "https://cdn0.bodas.net/article-vendor/2781/original/960/jpg/200808-joan-sarda-165_1_2781-160078581655971.webp"
    ]
  },
  {
    name: "Cortina de Luces LED",
    description: "Cortina de luces LED blancas cálidas de 3x3 metros",
    category: "Decoración",
    price: 35000, // Cortina de luces LED
    stock: 4, // Stock fijo aleatorio
    images: [
      "https://casaroyal.vtexassets.com/arquivos/ids/164711/112223_1.jpg?v=638481851542000000",
      "https://mundoselfie.cl/image/cache/data/Agosto%202021/WhatsApp%20Image%202021-08-26%20at%201.06.52%20PM-500x500.jpeg",
      "https://ventasdv.cl/wp-content/uploads/2020/10/cortinas-220v.jpg"
    ]
  },
  {
    name: "Set de Velas Aromáticas",
    description: "Set de 10 velas aromáticas en recipientes de cristal",
    category: "Decoración",
    price: 28000, // Set de velas aromáticas
    stock: 7, // Stock fijo aleatorio
    images: [
      "https://www.cosmeticaval.cl/wp-content/uploads/2023/09/CVL212871000_1-600x600.jpg",
      "https://www.cosmeticaval.cl/wp-content/uploads/2023/09/CVL212871000_7-600x600.jpg",
      "https://www.cosmeticaval.cl/wp-content/uploads/2023/09/CVL212871000_6.jpg"
    ]
  },
  {
    name: "Camino de Mesa",
    description: "Camino de mesa en tela de encaje blanco de 3 metros",
    category: "Decoración",
    price: 25000, // Camino de mesa
    stock: 9, // Stock fijo aleatorio
    images: [
      "https://www.fiestafacil.com/content/images/thumbs/0015594_camino-de-mesa-blanco-encaje-tela-3m_600.jpeg",
      "https://www.fiestafacil.com/content/images/thumbs/0015591_camino-de-mesa-blanco-encaje-tela-3m_600.jpeg",
      "https://www.fiestafacil.com/content/images/thumbs/0015592_camino-de-mesa-blanco-encaje-tela-3m_600.jpeg"
    ]
  },
  {
    name: "Arco Decorativo",
    description: "Arco decorativo de flores artificiales y tela",
    category: "Decoración",
    price: 120000, // Arco decorativo
    stock: 2, // Stock fijo aleatorio
    images: [
      "https://cdn0.matrimonios.cl/vendor/9047/3_2/960/jpg/dscn0296_8_119047.webp",
      "https://cdn0.matrimonios.cl/vendor/9047/original/1280/jpg/dscn0310_8_119047.webp",
      "https://cdn0.matrimonios.cl/vendor/9047/original/1280/jpg/dsc-4632-2_8_119047.webp"
    ]
  },

  // Recuerdos
  {
    name: "Mini Suculentas",
    description: "Pequeñas suculentas en macetas decorativas",
    category: "Recuerdos",
    price: 3500, // Mini suculentas
    stock: 20, // Stock fijo aleatorio
    images: [
      "https://www.elblogdelatabla.com/wp-content/uploads/2022/03/macetas-suculentas-peque25C325B1a-marmol-oro-madera2B1000px.jpg",
      "https://www.elblogdelatabla.com/wp-content/uploads/2022/03/mini-macetas-ceramica-cemento-suculentas2B2528112529.jpg",
      "https://www.elblogdelatabla.com/wp-content/uploads/2022/03/mini-macetas-ceramica-cemento-suculentas2B252892529.jpg"
    ]
  },
  {
    name: "Jabones Artesanales",
    description: "Jabones aromáticos decorativos en caja personalizada",
    category: "Recuerdos",
    price: 4000, // Jabones artesanales
    stock: 15, // Stock fijo aleatorio
    images: [
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh0cTW6Au_x6ZAin6wIpeQqRDc1ZsUCJX9MHlixZNjeXzdMuCczdaaZ2yQY4o-nCnnkpk07Jc83q9FP4RCrFudjTJui5na6tRr0bqwk61yoy_Q6FY8ji96uaP1-ylZssa0Wyv2iHXcY2OQ/s640/detalles-aromaticos-eventos-jabones-caseros-naturales.jpg",
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj1nnT9j7j6sCnWixeFp2t45XmDmBYekzDtsI8maQGfgo_-9dF2UUcAGXea5FT7DXCPnaY6620QOnnCuLHWeN-5Vji43IZtn-QjzAMEZ8lyuQU1E7HdTlojUIjGOWvHMmtQAoPeQQK1GJI/s640/regalos-aromaticos-eventos-jabones-artesanales-caseros.jpg",
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgqSECeARCU05SQGMT5jQ0ol927DH1L6jpQRgFJT28v5OBx_Jvbhav-DHd5l2H2GrCy398l6nMrd6DeSHLkMljRaM8KBPdiUE_TZEzP80YV3yiGeRKIqRxXRlej83z1NDDkW6gtkKiOP78/s640/obsequios-aromaticos-eventos-jabon-canela.JPG"
    ]
  },
  {
    name: "Velas Personalizadas",
    description: "Velas pequeñas con nombres de invitados",
    category: "Recuerdos",
    price: 2500, // Velas personalizadas
    stock: 25, // Stock fijo aleatorio
    images: [
      "https://cdn0.matrimonios.cl/vendor/4035/3_2/960/jpg/file-1588959156685_8_154035-158895915911313.webp",
      "https://cdn0.matrimonios.cl/vendor/4035/original/1280/jpg/20201116-051349_8_154035-160576654899605.webp",
      "https://cdn0.matrimonios.cl/vendor/4035/original/1280/jpg/file-1589430364870_8_154035-158943036648034.webp"
    ]
  },
  {
    name: "Llaveros Personalizados",
    description: "Llaveros grabados con fecha de la boda",
    category: "Recuerdos",
    price: 3000, // Llaveros personalizados
    stock: 30, // Stock fijo aleatorio
    images: [
     "https://cdn0.matrimonios.cl/vendor/0947/3_2/960/jpeg/image_8_110947_v7.webp",
      "https://cdn0.matrimonios.cl/vendor/0947/original/1280/jpg/image-2205jpg_8_110947.webp",
      "https://cdn0.matrimonios.cl/vendor/0947/original/1280/jpg/image-5889jpg_8_110947.webp"
    ]
  },
  {
    name: "Bolsas de Confeti",
    description: "Bolsitas de confeti biodegradable",
    category: "Recuerdos",
    price: 1500, // Bolsas de confeti
    stock: 40, // Stock fijo aleatorio
    images: [
      "https://http2.mlstatic.com/D_NQ_NP_907872-MLC74625730166_022024-O-confeti-de-boda-multicolor-brillante-floral-biodegradab.webp",
      "https://http2.mlstatic.com/D_NQ_NP_992718-MLC73504558614_122023-O-x-2-lanza-confeti-100cm-fin-de-ano-fiestas-cumpleanos.webp",
      "https://http2.mlstatic.com/D_NQ_NP_678763-MLC73198958698_122023-O-pack-x-5-lanza-confeti-cotillon-ano-nuevo-30-cm.webp"
    ]
  },

  // Accesorios
  {
    name: "Tiara de Novia",
    description: "Tiara de cristales y perlas para novia",
    category: "Accesorios",
    price: 85000, // Tiara de novia
    stock: 3, // Stock fijo aleatorio
    images: [
      "https://http2.mlstatic.com/D_NQ_NP_604935-MLC72259048551_102023-O-tocado-tiara-para-novia-o-peinado-primera-comunion-diadema.webp",
      "https://http2.mlstatic.com/D_NQ_NP_604935-MLC72259048551_102023-O-tocado-tiara-para-novia-o-peinado-primera-comunion-diadema.webp",
      "https://http2.mlstatic.com/D_NQ_NP_982806-MLC77916516820_082024-O-tocado-tiara-para-novia-o-peinado-primera-comunion-diadema.webp"
    ]
  },
  {
    name: "Set de Copas",
    description: "Set de copas decoradas para novios",
    category: "Accesorios",
    price: 45000, // Set de copas
    stock: 5, // Stock fijo aleatorio
    images: [
      "https://http2.mlstatic.com/D_NQ_NP_666975-MLC52178442255_102022-O-set-de-copa-de-novios-.webp",
      "https://http2.mlstatic.com/D_NQ_NP_631855-MLC52178352708_102022-O-set-de-copa-de-novios-.webp",
      "https://http2.mlstatic.com/D_NQ_NP_2X_938906-MLC52178456175_102022-F-set-de-copa-de-novios-.webp"
    ]
  },
  {
    name: "Cojín para Anillos",
    description: "Cojín bordado para anillos de boda",
    category: "Accesorios",
    price: 25000, // Cojín para anillos
    stock: 8, // Stock fijo aleatorio
    images: [
      "https://http2.mlstatic.com/D_NQ_NP_838859-CBT80652085427_112024-O-nupcial-boda-amor-ancho-encaje-borde-cinta-almohada-cojin.webp",
      "https://http2.mlstatic.com/D_NQ_NP_653233-CBT80652085413_112024-O-nupcial-boda-amor-ancho-encaje-borde-cinta-almohada-cojin.webp",
      "https://http2.mlstatic.com/D_NQ_NP_769078-CBT80652085415_112024-O-nupcial-boda-amor-ancho-encaje-borde-cinta-almohada-cojin.webp"
    ]
  },
  {
    name: "Liga de Novia",
    description: "Liga de encaje con detalles en azul",
    category: "Accesorios",
    price: 15000, // Liga de novia
    stock: 12, // Stock fijo aleatorio
    images: [
      "https://http2.mlstatic.com/D_NQ_NP_775386-CBT81569406979_122024-O-conjunto-liga-nupcial-de-encaje-elastico-de-novia-fino.webp",
      "https://http2.mlstatic.com/D_NQ_NP_905632-CBT81569406981_122024-O-conjunto-liga-nupcial-de-encaje-elastico-de-novia-fino.webp",
      "https://http2.mlstatic.com/D_NQ_NP_838879-CBT81569406975_122024-O-conjunto-liga-nupcial-de-encaje-elastico-de-novia-fino.webp"
    ]
  },
  {
    name: "Ramo de Novia",
    description: "Ramo artificial de rosas blancas y rosadas",
    category: "Accesorios",
    price: 95000, // Ramo de novia
    stock: 4, // Stock fijo aleatorio
    images: [
      "https://http2.mlstatic.com/D_NQ_NP_842465-MLC76126829229_052024-O-rosas-decorativo-artificial-ramo-para-decoracion.webp",
      "https://http2.mlstatic.com/D_NQ_NP_710353-MLC70288163617_072023-O-rosas-decorativo-artificial-ramo-para-decoracion.webp",
      "https://http2.mlstatic.com/D_NQ_NP_818273-MLC70288448773_072023-O-rosas-decorativo-artificial-ramo-para-decoracion.webp"
    ]
  },

  // Iluminación
  {
    name: "Guirnalda de Luces",
    description: "Guirnalda de luces LED blancas de 10 metros",
    category: "Iluminación",
    price: 29990, // Guirnalda de luces
    stock: 10, // Stock fijo aleatorio
    images: [
      "https://http2.mlstatic.com/D_NQ_NP_958025-MLC78246479026_082024-O-guirnalda-de-luces-led-impermeables-50-led-bola-10-metros.webp",
      "https://http2.mlstatic.com/D_NQ_NP_934099-MLC78246725762_082024-O-guirnalda-de-luces-led-impermeables-50-led-bola-10-metros.webp",
      "https://http2.mlstatic.com/D_NQ_NP_678026-MLC78476314993_082024-O-guirnalda-de-luces-led-impermeables-50-led-bola-10-metros.webp"
    ]
  },
  {
    name: "Farolillos Colgantes",
    description: "Set de 10 farolillos de papel con LED",
    category: "Iluminación",
    price: 45000, // Farolillos colgantes
    stock: 6, // Stock fijo aleatorio
    images: [
      "https://http2.mlstatic.com/D_NQ_NP_916046-MLC72168582351_102023-O-juego-de-48-faroles-de-papel-y-luces-de-farolillos-led-.webp",
      "https://http2.mlstatic.com/D_NQ_NP_601112-MLC72168582349_102023-O-juego-de-48-faroles-de-papel-y-luces-de-farolillos-led-.webp",
      "https://http2.mlstatic.com/D_NQ_NP_681456-MLC72168582345_102023-O-juego-de-48-faroles-de-papel-y-luces-de-farolillos-led-.webp"
    ]
  },
  {
    name: "Velas LED Recargables",
    description: "Pack de 20 velas LED con control remoto",
    category: "Iluminación",
    price: 38000, // Velas LED recargables
    stock: 8, // Stock fijo aleatorio
    images: [
      "https://http2.mlstatic.com/D_NQ_NP_856925-MLC48959866781_012022-O-pack-x3-velas-led-con-control-remoto-lamparas-decoracion.webp",
      "https://http2.mlstatic.com/D_NQ_NP_864898-MLC80839963134_122024-O-pack-x3-velas-led-con-control-remoto-lamparas-decoracion.webp",
      "https://http2.mlstatic.com/D_NQ_NP_690380-MLC81105500261_122024-O-pack-x3-velas-led-con-control-remoto-lamparas-decoracion.webp"
    ]
  },
  {
    name: "Proyector de Luz",
    description: "Proyector LED con patrones personalizables",
    category: "Iluminación",
    price: 75000, // Proyector de luz
    stock: 3, // Stock fijo aleatorio
    images: [
      "https://http2.mlstatic.com/D_NQ_NP_827197-CBT76508327397_052024-O-luz-disco-led-rgb-laser-proyector-disco-fiestas-60-patrones.webp",
      "https://http2.mlstatic.com/D_NQ_NP_841051-CBT76317324816_052024-O-luz-disco-led-rgb-laser-proyector-disco-fiestas-60-patrones.webp",
      "https://http2.mlstatic.com/D_NQ_NP_922243-CBT76317324840_052024-O-luz-disco-led-rgb-laser-proyector-disco-fiestas-60-patrones.webp"
    ]
  },
  {
    name: "Tira LED RGB",
    description: "Tira LED de 5 metros con cambio de colores",
    category: "Iluminación",
    price: 42000, // Tira LED RGB
    stock: 7, // Stock fijo aleatorio
    images: [
      "https://http2.mlstatic.com/D_NQ_NP_930928-CBT43564386467_092020-O-tira-de-luces-led-que-cambian-de-color-de-20-m-5-mx4-con-m.webp",
      "https://http2.mlstatic.com/D_NQ_NP_667169-MLC44204646850_112020-O-tira-de-luces-led-que-cambian-de-color-de-20-m-5-mx4-con-m.webp",
      "https://http2.mlstatic.com/D_NQ_NP_636774-CBT43564386472_092020-O-tira-de-luces-led-que-cambian-de-color-de-20-m-5-mx4-con-m.webp"
    ]
  }
];

// Exportamos el array de productos para su uso en otros componentes
export default products; 