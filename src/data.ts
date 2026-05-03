export type Stage = 'Avanzada' | 'Hub regulatorio' | 'Pionera' | 'Exportadora' | 'Emergente';

export interface Link {
  label: string;
  url: string;
}

export interface Actor {
  name: string;
  type: string;
  desc?: string;
  investment?: string;
  links?: Link[];
}

export interface Project {
  name: string;
  status: string;
  budget?: string;
  desc?: string;
  links?: Link[];
}

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  date: string;
  url: string;
}

export interface ProvinceData {
  id: string;
  name: string;
  stage: Stage;
  actors: number;
  ngos: number;
  smes: number;
  rd: number;
  dispensaries: number;
  mainActors: Actor[];
  projects: Project[];
  rdProjects: Project[];
  framework: string;
  commercialProjection: string;
  legalProjection: string;
  totalInvestment?: string;
  description?: string;
  sources?: Link[];
  localNews?: NewsItem[];
}

export const PROVINCE_DATA: Record<string, ProvinceData> = {
  "Buenos Aires": {
    id: "Buenos Aires", name: "Buenos Aires", stage: "Avanzada",
    actors: 180, ngos: 60, smes: 55, rd: 25, dispensaries: 40, totalInvestment: "USD 15M",
    description: "Concentra el mayor mercado de consumo, pacientes de REPROCANN y ecosistema cooperativo. Polo pujante con gran impulso público y académico en 2026.",
    commercialProjection: "Muy Alta. Cluster Mar del Plata y agencias en La Plata propician el boom de cooperativas y PYMES cannábicas.",
    legalProjection: "Extremadamente favorable. Ley provincial incentiva proyectos públicos, privados y asociativos, protegiendo laboratorios locales.",
    mainActors: [
      { name: "Pampa Hemp", type: "Empresa Privada", desc: "Pionera en el acuerdo de transferencia tecnológica con INTA Pergamino.", investment: "USD 2M", links: [{ label: "Pampa Hemp", url: "https://pampahemp.com/" }] },
      { name: "Mamá Cultiva", type: "ONG", desc: "Base del tejido social y del modelo de cooperativismo provincial." },
      { name: "Clúster MDQ", type: "Cámara", desc: "Clúster marplatense para la industria y cáñamo." }
    ],
    projects: [{ name: "Red de Farmacias PBA", status: "Activo", budget: "USD 1.5M", desc: "Articulación de dispensarios y laboratorios magistrales bonaerenses." }],
    rdProjects: [
      { name: "Genéticas UNLP", status: "Fase III", desc: "Estabilización de las 'Cepas Platenses'.", budget: "USD 800K" },
      { name: "Bioprocesos UNAJ / CONICET", status: "Activo", desc: "Mecanismos de extracción sustentables sin solventes." }
    ],
    framework: "Ley 14.924 adhesión + Programa Provincial Activo",
    sources: [{ label: "PBA Salud", url: "https://www.gba.gob.ar/saludprovincia/cannabis" }],
    localNews: [
      { id: "ba1", title: "Consolidación de las cooperativas canábicas bonaerenses tras el boom de 2025", source: "PBA Salud", date: "Feb 2026", url: "https://www.gba.gob.ar/saludprovincia" },
      { id: "ba2", title: "El Clúster de Mar del Plata logra primera exportación propia de semillas", source: "Revista THC", date: "Mar 2026", url: "https://revistathc.com" }
    ]
  },
  "Capital Federal": {
    id: "Capital Federal", name: "CABA", stage: "Hub regulatorio",
    actors: 85, ngos: 12, smes: 38, rd: 25, dispensaries: 10, totalInvestment: "USD 12M",
    description: "Sede de autoridades nacionales como ARICCAME y Ministerio de Salud. Tras las reestructuraciones de 2024, el sistema se estabilizó en 2025-2026.",
    commercialProjection: "Media-Alta. Las licencias de ARICCAME comenzaron a fluir sostenidamente a partir de fines de 2025.",
    legalProjection: "El REPROCANN mantiene filtros estrictos desde la Res. 3132/2024, limitando el acceso a patologías específicas con evidencia robusta.",
    mainActors: [
      { name: "ARICCAME", type: "Agencia Estatal", desc: "Agencia Regulatoria estabilizada tras su reorganización directiva.", links: [{ label: "Oficial", url: "https://www.argentina.gob.ar/produccion/ariccame" }] },
      { name: "Ministerio de Salud", type: "Gobierno", desc: "Administrador del REPROCANN." }
    ],
    projects: [{ name: "REPROCANN", status: "Operativo", desc: "Registro estandarizado operativo bajo normativas de 2024." }],
    rdProjects: [
      { name: "Ensayos Clínicos Nacionales", status: "Activos", desc: "Estudios sobre uso médico liderados por el Hospital Garrahan.", budget: "N/A" },
      { name: "Red Analítica ANLIS Malbrán", status: "Operativo", desc: "Estandarización de cromatografía a nivel nacional." },
      { name: "Nanoemulsiones UBA/CONICET", status: "En curso", desc: "Nanotecnología aplicada a formulaciones para incrementar biodisponibilidad." }
    ],
    framework: "Sede de autoridades nacionales y agencias regulatorias",
    localNews: [
      { id: "caba1", title: "ARICCAME emite el primer bloque de 50 licencias para cáñamo industrial", source: "Boletín Oficial", date: "Ene 2026", url: "https://www.boletinoficial.gob.ar" },
      { id: "caba2", title: "Reprocann 2026: Cómo funciona tras dos años de la normativa restrictiva", source: "Infobae", date: "Abr 2026", url: "https://www.infobae.com" }
    ]
  },
  "Cordoba": {
    id: "Cordoba", name: "Córdoba", stage: "Avanzada",
    actors: 65, ngos: 18, smes: 25, rd: 12, dispensaries: 10, totalInvestment: "USD 8M",
    description: "El gigante agroindustrial consolidó en 2026 su apuesta por el cáñamo industrial y las agtech aplicadas.",
    commercialProjection: "Muy Alta (Cáñamo). Capacidad tractora del agro tradicional volcándose a la fibra y semillas de cáñamo.",
    legalProjection: "Integradora. Ecosistema de leyes que fomentan inversiones de maquinaria e I+D.",
    mainActors: [{ name: "Cámara Empr. de Cáñamo", type: "Cámara", desc: "Vanguardia de la industrialización cordobesa del cultivo." }, { name: "CEPROCOR", type: "I+D", desc: "Centro de Excelencia en extracción y analítica." }],
    projects: [{ name: "Polo Cañamero San Francisco", status: "Operativo", budget: "USD 4M", desc: "Transformación de biomasa para industria textil y autopartes." }],
    rdProjects: [
      { name: "Control Calidad CEPROCOR", status: "Activo", desc: "Espectrometría certificada internacionalmente." },
      { name: "Biomateriales INTA Manfredi", status: "Piloto", desc: "Desarrollo de bioplásticos y eco-construcción a partir de fibra de cáñamo." }
    ],
    framework: "Ley Prov. e incentivos industriales",
    localNews: [
      { id: "cba1", title: "Fábricas de maquinaria cordobesa adaptan líneas para la cosecha del cáñamo", source: "La Voz", date: "Feb 2026", url: "https://www.lavoz.com.ar" },
      { id: "cba2", title: "CEPROCOR logra certificación ISO para análisis de cannabinoides", source: "Cba24n", date: "Ene 2026", url: "https://www.cba24n.com.ar" }
    ]
  },
  "Jujuy": {
    id: "Jujuy", name: "Jujuy", stage: "Exportadora",
    actors: 22, ngos: 3, smes: 5, rd: 4, dispensaries: 2, totalInvestment: "USD 25M",
    description: "Pionera absoluta en el cultivo a gran escala. Modelo inicial 100% estatal que logró expandirse internacionalmente.",
    commercialProjection: "Muy Alta (Exportación). Capacidad instalada exportando exitosamente CBD a mercados europeos en 2026.",
    legalProjection: "Monopolio estatal flexibilizado, permitiendo primeras participaciones privadas secundarias.",
    mainActors: [{ name: "Cannava SE", type: "Empresa Estatal", desc: "Mayor proyecto público del país, consolidado globalmente.", investment: "USD 25M", links: [{ label: "Cannava", url: "https://cannava.com.ar/" }] }],
    projects: [{ name: "Ampliación Planta de Extracción", status: "Completado", budget: "USD 15M", desc: "Planta operativa con certificación GMP Europa." }],
    rdProjects: [
      { name: "Mejoramiento Cannava", status: "Activo", desc: "Desarrollo de cepas top andinas." },
      { name: "Optimización Agronómica INTA Yuto", status: "Activo", desc: "Nutrición mineral diferencial en suelos puneños." }
    ],
    framework: "Ley 6.088 - Empresa Estatal",
    localNews: [
      { id: "juy1", title: "Cannava consolida sus exportaciones de CBD de grado médico a Europa y Oceanía", source: "El Tribuno de Jujuy", date: "May 2026", url: "https://www.eltribunodejujuy.com" },
      { id: "juy2", title: "Nuevas alianzas público-privadas dinamizan el polo productivo El Pongo", source: "Todo Jujuy", date: "Feb 2026", url: "https://www.todojujuy.com" }
    ]
  },
  "Chubut": {
    id: "Chubut", name: "Chubut", stage: "Pionera",
    actors: 18, ngos: 6, smes: 5, rd: 4, dispensaries: 3, totalInvestment: "USD 1.2M",
    description: "Aprobó la Ley Salomé, creando ACCICAN, descentralizando el control.",
    commercialProjection: "Media. Nicho de productos premium patagónicos.",
    legalProjection: "Muy favorable. Ley Salomé (2024) crea agencia descentralizada ágil.",
    mainActors: [{ name: "Whale Leaf Farm", type: "Empresa Privada", desc: "Cultivo en Puerto Madryn." }, { name: "ACCICAN", type: "Agencia", desc: "Agencia provincial descentralizada." }],
    projects: [{ name: "Cultivo Comunitario", status: "Activo", desc: "Abastecimiento a pacientes locales." }],
    rdProjects: [
      { name: "Cepas Patagónicas", status: "Activo", desc: "Investigación en CENPAT.", budget: "USD 300K" },
      { name: "Biotecnología Marina y Cannabis", status: "Concluido", desc: "Bio-fertilizantes a base de algas patagónicas (CENPAT-CONICET)." }
    ],
    framework: "Ley Salomé (Oct 2024)",
    localNews: [
      { id: "chu1", title: "Aprobada la Ley Salomé: Chubut crea su propia agencia", source: "Diario Jornada", date: "Oct 2025", url: "https://www.google.com/search?q=cannabis+argentina" },
      { id: "chu2", title: "Puerto Madryn avanza con el primer cultivo eólico", source: "El Chubut", date: "Ene 2026", url: "https://www.google.com/search?q=cannabis+argentina" }
    ]
  },
  "Mendoza": {
    id: "Mendoza", name: "Mendoza", stage: "Avanzada",
    actors: 55, ngos: 10, smes: 25, rd: 15, dispensaries: 5, totalInvestment: "USD 10M",
    description: "Hub logístico e investigativo, uniendo el capital vitivinícola con regulaciones provinciales de avanzada.",
    commercialProjection: "Muy Alta. La sanción de normativas locales 'Cannabis Seguro' propició un salto de inversiones externas.",
    legalProjection: "Regulaciones pioneras pro-mercado que superan barreras de burocracia nacional.",
    mainActors: [{ name: "ISCAMEN", type: "Estado/I+D", desc: "Fiscalización fitozoosanitaria y ensayos." }, { name: "Biotecnología Mendocina", type: "Empresa", desc: "Extractos full spectrum y aislados.", investment: "USD 4M" }],
    projects: [{ name: "Polo Biotecnológico San Rafael", status: "Ampliación", budget: "USD 5M", desc: "Hub de bioprocesos." }],
    rdProjects: [
      { name: "Estudios Terroir INTA Luján", status: "Activo", desc: "Perfil de terpenos adaptado a radiación UV andina." },
      { name: "Desarrollo Fotobiológico UNCuyo", status: "En curso", desc: "Manejo de estrés lumínico para hiper-expresión de cannabinoides raros (CBG, CBN)." }
    ],
    framework: "Regulación 'Cannabis Seguro' Mendoza",
    localNews: [
      { id: "mdz1", title: "Viñedos y cannabis: el 'blending' que atrae capitales vitivinícolas", source: "Los Andes", date: "Feb 2026", url: "https://www.losandes.com.ar" },
      { id: "mdz2", title: "ISCAMEN lidera protocolos de seguridad vegetal para exportar flores", source: "MDZ Online", date: "Dic 2025", url: "https://www.mdzol.com" }
    ]
  },
  "Santa Fe": {
    id: "Santa Fe", name: "Santa Fe", stage: "Avanzada",
    actors: 65, ngos: 20, smes: 25, rd: 15, dispensaries: 5, totalInvestment: "USD 12M",
    description: "Líder regional absoluto en investigación aplicada y salud pública. En 2026 sustituyó importaciones para el estado.",
    commercialProjection: "Alta. LIF Santa Fe consolida producción propia sin comprar API al exterior.",
    legalProjection: "Sólida y apoyada en el sistema de salud provincial (SIPROSA/IAPOS).",
    mainActors: [{ name: "LIF Santa Fe", type: "Laboratorio Público", desc: "Laboratorio Industrial Farmacéutico, produce el aceite de salud pública.", investment: "USD 5M" }, { name: "Centro de Investigación UNL", type: "I+D", desc: "Biotecnología y extracción supercrítica." }],
    projects: [{ name: "Distribución LIF CBD", status: "Consolidado", desc: "Garantiza tratamiento a 5000+ pacientes provinciales." }],
    rdProjects: [
      { name: "Ensayo Clínico Hospital Alassia", status: "Fase IV", desc: "Estudios pediátricos con cepas de la provincia." },
      { name: "Edición Génica y Agtech (IAL)", status: "Experimental", desc: "Startups incubadas modificando genética via CRISPR para máxima producción de API." }
    ],
    framework: "Modelo de Salud Pública y Equidad",
    localNews: [
      { id: "sfe1", title: "El LIF reporta sustitución del 100% en importaciones de CBD estatal", source: "La Capital", date: "Mar 2026", url: "https://www.lacapital.com.ar" },
      { id: "sfe2", title: "La UNL desarrolla nuevos métodos de purificación costo-efectivos", source: "Rosario3", date: "Ene 2026", url: "https://www.rosario3.com" }
    ]
  },
  "La Rioja": {
    id: "La Rioja", name: "La Rioja", stage: "Exportadora",
    actors: 25, ngos: 4, smes: 8, rd: 5, dispensaries: 8, totalInvestment: "USD 18M",
    description: "El exitoso modelo estatal (SAPEM) cruzó fronteras. Agrogenética es un líder indiscutido en la provisión del Noroeste argentino.",
    commercialProjection: "Muy Alta. Registrando cepas únicas, atesorando genética propia, y operando turismo cannábico en Chilecito.",
    legalProjection: "El entorno 100% resguardado por el Estado provincial garantiza inversiones con marco ultra-blindado.",
    mainActors: [{ name: "Agrogenética Riojana SAPEM", type: "Empresa Mixta", desc: "Producción a escala y turismo cannábico.", investment: "USD 14M", links: [{ label: "Sitio Oficial", url: "https://agrogenetica.com.ar/" }] }],
    projects: [{ name: "Turismo Industrial en Chilecito", status: "Operativo", desc: "Primer complejo turístico-productivo de la región." }],
    rdProjects: [
      { name: "Registro Cepa Argenta", status: "Completado y en venta", desc: "Licenciamiento de la genética 'Argenta'." },
      { name: "Micropropagación In-Vitro Biogenética", status: "Activo", desc: "Automatización de propagación clonal libre de virus en alianza con CONICET." }
    ],
    framework: "Empresa de capital estatal mayoritario",
    localNews: [
      { id: "lr1", title: "Las farmacias riojanas agotan los lotes de 'El Federal CBD'", source: "Nueva Rioja", date: "Mar 2026", url: "https://www.nuevarioja.com.ar" },
      { id: "lr2", title: "Ruta del Cannabis en Chilecito atrae a mil turistas la primera semana", source: "El Independiente", date: "Ene 2026", url: "https://www.elindependiente.com.ar" }
    ]
  },
  "San Juan": {
    id: "San Juan", name: "San Juan", stage: "Avanzada",
    actors: 30, ngos: 5, smes: 14, rd: 8, dispensaries: 3, totalInvestment: "USD 16M",
    description: "CanMe (Cannabis Medicinal San Juan S.E.) consolidó el Parque Industrial como polo de aterrizaje para capitales internacionales.",
    commercialProjection: "Alta. La modalidad 'llave en mano' estatal reduce los riesgos operativos para los privados.",
    legalProjection: "Estabilidad jurídica garantizada dentro de las fronteras de los predios estatales.",
    mainActors: [{ name: "CanMe San Juan", type: "Empresa Estatal", desc: "Administrador del Polo Tecnológico.", investment: "USD 10M", links: [{ label: "CanMe", url: "https://canmesanjuan.com.ar" }] }, { name: "Privados Parque", type: "Inversores", desc: "Holdings israelíes y canadienses instalados." }],
    projects: [{ name: "Clúster Tecnológico Campestre", status: "Completado", desc: "Naves industriales ya rentadas por 4 empresas extranjeras." }],
    rdProjects: [
      { name: "Riego de Extrema Eficiencia", status: "Validado", desc: "Técnicas de hidroponía en ambientes ultra-áridos." },
      { name: "Control de Patógenos por Radiación UVC", status: "Fase I", desc: "Sanitización del aire en clusters sin afectar perfiles terpénicos." }
    ],
    framework: "Sinergia Público-Privada (Parques Industriales)",
    localNews: [
      { id: "sj1", title: "Firmas canadienses exportan sus primeras partidas desde el predio CanMe", source: "Diario de Cuyo", date: "Feb 2026", url: "https://www.diariodecuyo.com.ar" },
      { id: "sj2", title: "El sistema de riego para áreas áridas es patentado por ingenieros locales", source: "Tiempo de San Juan", date: "Dic 2025", url: "https://www.tiempodesanjuan.com" }
    ]
  },
  "Neuquen": {
    id: "Neuquen", name: "Neuquén", stage: "Emergente",
    actors: 12, ngos: 4, smes: 5, rd: 2, dispensaries: 1, totalInvestment: "USD 800K",
    description: "Primeros pasos regulatorios, enfoque en apoyar a pequeños productores.",
    commercialProjection: "Baja-Media. Etapa inicial para mercado interno.",
    legalProjection: "En desarrollo. Marcos para facilitar transición a la legalidad.",
    mainActors: [{ name: "BPN", type: "Financiamiento", desc: "Líneas de crédito productivas." }],
    projects: [{ name: "Cultivo Patagonia", status: "Propuesta", desc: "Iniciativas locales indoor." }],
    rdProjects: [{ name: "Perfilamiento Terpénico Alto Valle", status: "Activo", desc: "Laboratorio provincial estudiando el efecto bioclimático del norte patagónico en floración." }],
    framework: "Iniciativas locales, apoyo crediticio",
    localNews: [
      { id: "nq1", title: "El BPN lanza créditos blandos para productores locales", source: "LM Neuquén", date: "Feb 2026", url: "https://www.google.com/search?q=cannabis+argentina" }
    ]
  },
  "Catamarca": {
    id: "Catamarca", name: "Catamarca", stage: "Emergente",
    actors: 18, ngos: 5, smes: 8, rd: 6, dispensaries: 2, totalInvestment: "USD 1.8M",
    description: "Iniciativas enmarcadas bajo Catamarca Cannabis SE, articulando fuertemente investigación con la Universidad Nacional para aprovechamiento hídrico.",
    commercialProjection: "Media. Mercado en fase de expansión, apostando a concentrados de grado intermedio y aceites para la región NOA.",
    legalProjection: "Adhesión nacional estricta y delegación de monopolio primario a la empresa estatal.",
    mainActors: [
      { name: "Catamarca Cannabis SE", type: "Empresa Estatal", desc: "Monopolio estatal para el desarrollo primario e industrial.", investment: "USD 1M" },
      { name: "UNCA", type: "I+D", desc: "Validación de parcelas bajo estrés." }
    ],
    projects: [{ name: "Polo Nueva Coneta", status: "Operativo", desc: "Clúster cerrado con riego por goteo inteligente." }],
    rdProjects: [
      { name: "Adaptabilidad Valles Áridos", status: "Concluido", desc: "Identificación de cepas americanas viables en el clima local." },
      { name: "Sustratos Mixtos Catamarca", status: "Activo", desc: "Desarrollo de biocarbón de desechos de olivos locales para indoor." }
    ],
    framework: "Adhesión a Ley Nacional y Empresa Estatal Activa",
    localNews: [
      { id: "cat1", title: "Catamarca Cannabis SE logra su primera cosecha masiva en Nueva Coneta", source: "El Ancasti", date: "Ene 2026", url: "https://www.elancasti.com.ar" }
    ]
  },
  "Chaco": {
    id: "Chaco", name: "Chaco", stage: "Emergente",
    actors: 22, ngos: 6, smes: 9, rd: 7, dispensaries: 3, totalInvestment: "USD 2.5M",
    description: "Progreso biotecnológico capitaneado por UNCAus y Laboratorios Chaqueños, centrado en fitofármacos trazables.",
    commercialProjection: "Media-Alta. Apunta a insertarse como proveedor farmacéutico mayorista de todo el NEA.",
    legalProjection: "Ambiente muy favorable apoyado en la sólida estructura universitaria y laboratorios estatales.",
    mainActors: [
      { name: "Laboratorios Chaqueños S.A.", type: "Laboratorio Público", desc: "Referente regional en producción pública de medicamentos." },
      { name: "UNCAus", type: "I+D", desc: "Líder regional en fitoquímica y extracción de aceites esenciales." }
    ],
    projects: [{ name: "Red Farmacéutica NEA", status: "Fase Piloto", desc: "Distribución de formulaciones CBD en el sistema de salud provincial." }],
    rdProjects: [
      { name: "Cromatografía Chaqueña", status: "Operativo", desc: "Primer centro de testeo de potencia cannabinoides y terpenos para las provincias vecinas." },
      { name: "Tolerancia a Plagas Tropicales", status: "En curso", desc: "Mejoramiento genómico vía selección masal en la estación INTA Chaco." }
    ],
    framework: "Sinergia Público-Universitaria",
    localNews: [
      { id: "cha1", title: "UNCAus inaugura el centro de cromatografía más avanzado del Nordeste", source: "Diario Norte", date: "Mar 2026", url: "https://www.diarionorte.com" }
    ]
  },
  "Corrientes": {
    id: "Corrientes", name: "Corrientes", stage: "Emergente",
    actors: 20, ngos: 4, smes: 8, rd: 6, dispensaries: 2, totalInvestment: "USD 4M",
    description: "Provincia en ascenso biotecnológico bajo la bandera de Caá Cannabis SE, su propia empresa estatal que avanza fuertemente en I+D.",
    commercialProjection: "Media pero con trayectoria agrícola. Focalizada en cáñamo textil (corriber y afines) e industrialización CBD.",
    legalProjection: "Empresa del estado habilitada, blindando jurídica e impositivamente las operaciones en el Centro Tecnológico Goya.",
    mainActors: [
      { name: "Caá Cannabis SE", type: "Empresa Estatal", desc: "Eje del plan provincial del Gobernador.", investment: "USD 2M", links: [{ label: "Gobierno Ctes", url: "https://www.corrientes.gob.ar" }] },
      { name: "INTA Bella Vista", type: "I+D", desc: "Socios estratégicos del estado." }
    ],
    projects: [{ name: "Centro Tecnológico Bella Vista", status: "Operativo", desc: "Cultivos controlados inaugurados a gran escala." }],
    rdProjects: [{ name: "Genéticas Resistentes NEA", status: "Activo", desc: "Adaptación del cannabis al clima caluroso del nordeste." }],
    framework: "Ley Prov. para Caá Cannabis SE",
    localNews: []
  },
  "Entre Rios": {
    id: "Entre Rios", name: "Entre Ríos", stage: "Avanzada",
    actors: 42, ngos: 12, smes: 18, rd: 8, dispensaries: 4, totalInvestment: "USD 3.5M",
    description: "Fuerte red de cultivadores solidarios, apoyo estatal e impulso a la producción industrial.",
    commercialProjection: "Alta. Ecosistema pyme muy activo y polo productivo en desarrollo.",
    legalProjection: "Ley provincial propia que protege el autocultivo y fomenta la industria.",
    mainActors: [
      { name: "IAPSER", type: "Gobierno", desc: "Instituto Autárquico Provincial del Seguro, financiamiento e impulso." },
      { name: "INTA Paraná", type: "I+D", desc: "Centro de cultivo experimental." },
      { name: "AgroCáñamo ER", type: "Empresa", desc: "Iniciativa de cáñamo industrial." }
    ],
    projects: [{ name: "Polo Productivo Paraná", status: "Activo", desc: "Cultivo en predio del INTA para investigación y producción." }],
    rdProjects: [
      { name: "Investigación Clínica CEMENER", status: "Activo", desc: "Ensayos oncológicos y de dolor crónico vinculados a cuidados paliativos." },
      { name: "Biotecnología Semilla de Cáñamo", status: "Activo", desc: "Selección genómica en INTA Oro Verde para adaptación a la baja Mesopotamia." }
    ],
    framework: "Ley Provincial de Accesibilidad"
  },
  "Formosa": {
    id: "Formosa", name: "Formosa", stage: "Emergente",
    actors: 15, ngos: 4, smes: 5, rd: 6, dispensaries: 2, totalInvestment: "USD 1.5M",
    description: "Centrada en biotecnología de validación agronómica subtropical a través de CEDEVA y producción pública con Laformed, buscando abastecer a la región.",
    commercialProjection: "Baja-Media. Etapas finales de validación agronómica para escalado productivo estatal en 2026.",
    legalProjection: "Control estatal estricto y centralizado, asegurando toda la cadena de valor en manos públicas.",
    mainActors: [
      { name: "CEDEVA", type: "I+D", desc: "Laboratorios de biotecnología vegetal y bancos de ensayo genético." },
      { name: "Laboratorios Laformed", type: "Laboratorio Público", desc: "Planta Piloto de purificación y formulación galénica." }
    ],
    projects: [{ name: "Red de Abastecimiento Laformed", status: "Fase Piloto", desc: "Primeros lotes de aceite CBD distribuidos en hospitales provinciales selectos." }],
    rdProjects: [
      { name: "Validación Agronómica CEDEVA", status: "Activo", desc: "Clonación y manejo radicular en suelos con alto estrés hídrico y térmico subtropical." },
      { name: "Fitocosmética Nativa", status: "Propuesta", desc: "Integración de extractos cannábicos con flor nativa formoseña." }
    ],
    framework: "Investigación y Producción Pública Centralizada",
    localNews: [
      { id: "fsa1", title: "CEDEVA avanza en la clonación de genéticas cannábicas resistentes al calor", source: "Diario Formosa", date: "Mar 2026", url: "https://www.elcomercial.com.ar" }
    ]
  },
  "La Pampa": {
    id: "La Pampa", name: "La Pampa", stage: "Emergente",
    actors: 25, ngos: 8, smes: 10, rd: 5, dispensaries: 3, totalInvestment: "USD 2.8M",
    description: "Con un ecosistema cooperativo respaldado desde el Estado, La Pampa fomenta un modelo agrotecnológico de pequeña y mediana escala.",
    commercialProjection: "Media. Énfasis marcado en el autoconsumo solidario, el cultivo en red y la trazabilidad provincial.",
    legalProjection: "Fuerte acompañamiento regulatorio con un registro provincial que protege jurídicamente a cultivadores.",
    mainActors: [
      { name: "INCUBATEC", type: "I+D", desc: "Incubadora de empresas de base tecnológica apoyando proyectos agtech." },
      { name: "Red de Cooperativas Pampeanas", type: "Cooperativas", desc: "Consorcio de pequeños productores de flores." }
    ],
    projects: [{ name: "Polo Agtech Santa Rosa", status: "En Construcción", budget: "USD 1.5M", desc: "Naves para cooperativistas con control ambiental centralizado." }],
    rdProjects: [
      { name: "Bioensayos UNLPam", status: "Activo", desc: "Caracterización fenotípica de las cepas cultivadas por cooperativas." },
      { name: "Trazabilidad Blockchain", status: "En implementación", desc: "Software local para rastrear lotes desde la semilla hasta el dispensario." }
    ],
    framework: "Registro provincial activo e Incubación",
    localNews: [
      { id: "lpa1", title: "Cooperativas pampeanas integran blockchain para asegurar la calidad de sus floraciones", source: "La Arena", date: "Feb 2026", url: "https://www.laarena.com.ar" }
    ]
  },
  "Misiones": {
    id: "Misiones", name: "Misiones", stage: "Avanzada",
    actors: 40, ngos: 8, smes: 15, rd: 12, dispensaries: 4, totalInvestment: "USD 12M",
    description: "Modelo productivo 100% integrado a través de la Biofábrica y MisioPharma, proveyendo al sistema de salud local de forma gratuita.",
    commercialProjection: "Alta. La gran capacidad instalada en propagación in vitro abre mercados nacionales de plantines certificados.",
    legalProjection: "Marco provincial de monopolio estatal de salud pública muy firme y exitoso económicamente.",
    mainActors: [
      { name: "MisioPharma", type: "Empresa Estatal", desc: "Fabricante de 'Misiocann', aceite de prescripción pública.", investment: "USD 5M" },
      { name: "Biofábrica Misiones", type: "I+D", desc: "Mayor centro de propagación vegetal de la mesopotamia.", investment: "USD 4M" }
    ],
    projects: [{ name: "Escalamiento Misiocann", status: "Operativo", desc: "Provisión permanente y gratuita en el 100% de los centros de salud misioneros." }],
    rdProjects: [
      { name: "Micropropagación Biofábrica", status: "Activo", desc: "Desarrollo de cultivares exentos de patógenos virales con base biotecnológica." },
      { name: "Bioplaguicidas Selváticos", status: "En curso", desc: "Uso de microorganismos de la selva paranaense para control de plagas en cannabis indoor." }
    ],
    framework: "Monopolio Estatal y Salud Pública",
    localNews: [
      { id: "mis1", title: "MisioPharma inaugura la segunda línea de extracción CO2 para abastecer la demanda", source: "El Territorio", date: "Abr 2026", url: "https://www.elterritorio.com.ar" },
      { id: "mis2", title: "La Biofábrica concreta su primera venta nacional de clones certificados", source: "Misiones Online", date: "Ene 2026", url: "https://misionesonline.net" }
    ]
  },
  "Rio Negro": {
    id: "Rio Negro", name: "Río Negro", stage: "Avanzada",
    actors: 50, ngos: 18, smes: 22, rd: 15, dispensaries: 6, totalInvestment: "USD 8.5M",
    description: "Sede del modelo pionero de articulación de Ciencia Sativa con el INTA en Guerrico, complementado con innovación farmacéutica de PROFARSE.",
    commercialProjection: "Alta. Gran experiencia acumulada en la región norpatagónica que atrae I+D de empresas foráneas.",
    legalProjection: "Ambiente muy favorable gracias al historial pionero y la fuerte cultura científica rionegrina (INVAP, CONICET).",
    mainActors: [
      { name: "PROFARSE", type: "Laboratorio Público", desc: "Productora Farmacéutica elaborando el aceite magistral público." },
      { name: "Ciencia Sativa / INTA", type: "ONG/I+D", desc: "Cultivo experimental emblemático en Guerrico." },
      { name: "INVAP Agtech", type: "I+D", desc: "Spinoff del INVAP aportando sensórica avanzada a cultivos." }
    ],
    projects: [{ name: "Ampliación Predio Guerrico", status: "Activo", desc: "Sumatoria de naves inteligentes aportadas por privados en alianza con INTA." }],
    rdProjects: [
      { name: "Sensores Fotónicos INVAP", status: "Fase de Prueba", desc: "Implementación de imágenes multiespectrales para predecir puntos de cosecha óptimos." },
      { name: "Formulaciones PROFARSE", status: "Activo", desc: "Pellets y parches transdérmicos de liberación prolongada." }
    ],
    framework: "Articulación Científica Público-Privada",
    localNews: [
      { id: "rn1", title: "Ciencia Sativa e INTA exportan 'know-how' técnico al resto de la Patagonia", source: "Diario Río Negro", date: "Mar 2026", url: "https://www.rionegro.com.ar" }
    ]
  },
  "Salta": {
    id: "Salta", name: "Salta", stage: "Avanzada",
    actors: 35, ngos: 8, smes: 15, rd: 8, dispensaries: 4, totalInvestment: "USD 10.5M",
    description: "Salta Cannabis SE y el polo agroindustrial marcan una fuerte apuesta de la provincia para rivalizar con Jujuy en volumen productivo.",
    commercialProjection: "Muy Alta. Transición de cultivos tabacaleros tradicionales hacia plantaciones controladas de cáñamo y cannabis.",
    legalProjection: "El modelo de Empresa Estatal actuando como articuladora (PPP) dinamiza la llegada de fondos privados.",
    mainActors: [
      { name: "Salta Cannabis SE", type: "Empresa Estatal", desc: "Sociedad del Estado impulsando asociaciones de capital." },
      { name: "INTA Salta / UNSa", type: "I+D", desc: "Red de investigación y validación de suelos de altura." }
    ],
    projects: [{ name: "Polo Mixto Valle de Lerma", status: "En proceso", budget: "USD 5M", desc: "Invernaderos y laboratorios tercerizados al sector privado." }],
    rdProjects: [
      { name: "Zonificación Ecorregional", status: "Concluido", desc: "Mapeo de la aptitud térmica de los valles salteños para cannabis de alto CBG." },
      { name: "Control de Suelos INTA", status: "Activo", desc: "Remediación de la matriz tabacalera para cultivo libre de metales pesados." }
    ],
    framework: "Concesiones PPP mediadas por Salta Cannabis SE",
    localNews: [
      { id: "sal1", title: "El Polo de Valle de Lerma atrae a ex-productores tabacaleros a la nueva industria", source: "El Tribuno Salta", date: "Feb 2026", url: "https://www.eltribuno.com/salta" }
    ]
  },
  "San Luis": {
    id: "San Luis", name: "San Luis", stage: "Emergente",
    actors: 20, ngos: 5, smes: 8, rd: 6, dispensaries: 3, totalInvestment: "USD 2.2M",
    description: "Iniciativas en constante maduración traccionadas por la calidad académica de UNSL y el poder productivo de Laboratorios Puntanos.",
    commercialProjection: "Media. Mercado de nicho apoyado en la producción pública y derivados farmacéuticos.",
    legalProjection: "Adhesión nacional armonizada. Políticas de fomento pyme activas del Ministerio de Producción.",
    mainActors: [
      { name: "Laboratorios Puntanos", type: "Laboratorio Público", desc: "Desarrollo de medicamentos a escala." },
      { name: "Universidad Nacional (UNSL)", type: "I+D", desc: "Liderazgo en farmacología experimental." }
    ],
    projects: [{ name: "Producción Puntanos CBD", status: "Operativo", desc: "Escalamiento en la red de farmacias de San Luis." }],
    rdProjects: [
      { name: "Investigación Analgésica UNSL", status: "Activo", desc: "Dosis-respuesta en dolor inflamatorio osteoarticular." },
      { name: "Eficiencia Eléctrica Indoor", status: "Piloto", desc: "Apoyo del Estado a operarios de indoor con energía renovable provincial." }
    ],
    framework: "Producción Pública y Fomento PyME",
    localNews: [
      { id: "sl1", title: "Laboratorios Puntanos lanza el nuevo compuesto analgésico de investigación local", source: "El Diario de la República", date: "May 2026", url: "https://www.eldiariodelarepublica.com" }
    ]
  },
  "Santa Cruz": {
    id: "Santa Cruz", name: "Santa Cruz", stage: "Emergente",
    actors: 15, ngos: 4, smes: 5, rd: 5, dispensaries: 2, totalInvestment: "USD 1.5M",
    description: "Condiciones de clima extremo empujan un modelo de cultivo exclusivamente indoor, con alta tecnificación impulsada por agencias locales.",
    commercialProjection: "Baja-Media. Desafíos logísticos importantes compensados por una red indoor hiper-controlada.",
    legalProjection: "Marco apoyado por Salud Pública, habilitando instalaciones con máxima rigurosidad de procesos.",
    mainActors: [
      { name: "Santa Cruz Agtech", type: "ONG/Cluster", desc: "Pioneros en granjas automatizadas." },
      { name: "UNPA / INTA", type: "I+D", desc: "Asesoramiento biométrico y control de ambiente." }
    ],
    projects: [{ name: "Red de Indoor Inclusiva", status: "Activo", desc: "Micro-cultivadores habilitados y testeados centralmente." }],
    rdProjects: [
      { name: "Optimización Térmica UNPA", status: "En proceso", desc: "Uso de energía eólica para calefacción costo-efectiva del cultivo." },
      { name: "Modelado Crecimiento en Frío", status: "Activo", desc: "Respuesta terpénica a oscilaciones bruscas de temperatura indoor." }
    ],
    framework: "Red de Autocultivadores Controlados",
    localNews: [
      { id: "scr1", title: "El primer clúster indoor 100% eólico de Río Gallegos inicia sus pruebas", source: "La Opinión Austral", date: "Ene 2026", url: "https://laopinionaustral.com.ar" }
    ]
  },
  "Santiago del Estero": {
    id: "Santiago del Estero", name: "Santiago del Estero", stage: "Emergente",
    actors: 14, ngos: 3, smes: 5, rd: 4, dispensaries: 1, totalInvestment: "USD 900K",
    description: "Fase de explosión académica. La UNSE encabeza validaciones para insertar cáñamo en la vasta matriz agropecuaria provincial.",
    commercialProjection: "Media (Cáñamo). Perspectiva de diversificación rural hacia mercados semilleros en 2026-2027.",
    legalProjection: "Adhesión nacional. Fuerte alineamiento gubernamental con el agtech para la transformación productiva.",
    mainActors: [
      { name: "UNSE / INTA Santiago", type: "I+D", desc: "Baluartes en la validación agronómica en tierras semiáridas." }
    ],
    projects: [{ name: "Parcelas Agro-Cañameras", status: "Piloto", desc: "Siembra experimental en zonas de gran rotación." }],
    rdProjects: [
      { name: "Estrés Hídrico Extremo UNSE", status: "Activo", desc: "Fenotipado de semillas resistentes a la prolongada sequía santiagueña." },
      { name: "Potencial Forrajero", status: "Propuesta", desc: "Análisis del uso de la torta de semilla post-extracción para industria avícola." }
    ],
    framework: "Investigación Agrotecnológica",
    localNews: [
      { id: "sde1", title: "Investigadores de la UNSE validan la cosecha de cáñamo con mínimo recurso hídrico", source: "El Liberal", date: "Feb 2026", url: "https://www.elliberal.com.ar" }
    ]
  },
  "Tierra del Fuego": {
    id: "Tierra del Fuego", name: "Tierra del Fuego", stage: "Pionera",
    actors: 25, ngos: 8, smes: 10, rd: 7, dispensaries: 4, totalInvestment: "USD 4M",
    description: "Ecosistema vibrante de indoor de máxima calidad propulsado por un activismo inigualable y la ciencia de frontera del CADIC-CONICET.",
    commercialProjection: "Alta (Nicho). Mercados boutique y turismo cannábico incipiente en 'El fin del mundo'.",
    legalProjection: "Activismo local ha consolidado normativas proteccionistas y redes comunitarias formalizadas muy sólidas.",
    mainActors: [
      { name: "CADIC-CONICET", type: "I+D", desc: "Referencia mundial en botánica sub-antártica y bioprospección." },
      { name: "Cannabis Fueguino Co.", type: "PyME", desc: "Naves indoor de hidroponía bajo régimen provincial." }
    ],
    projects: [{ name: "Ushuaia Cultiva", status: "Operativo", desc: "Clúster habilitado y turístico." }],
    rdProjects: [
      { name: "Sustratos Turba Fueguina", status: "Concluido", desc: "Demostración de mayor retención de nutrientes biológicos con turbas locales." },
      { name: "Espectro Lumínico CADIC", status: "Activo", desc: "Simulación controlada de fotoperiodos antárticos en cepas puras." }
    ],
    framework: "Polo Indoor Científico-Comunitario",
    localNews: [
      { id: "tdf1", title: "Tierra del Fuego presenta al mundo sus genéticas cultivadas en turbas exclusivas", source: "El Diario del Fin del Mundo", date: "Mar 2026", url: "https://www.eldiariodelfindelmundo.com" }
    ]
  },
  "Tucuman": {
    id: "Tucuman", name: "Tucumán", stage: "Avanzada",
    actors: 45, ngos: 12, smes: 18, rd: 12, dispensaries: 6, totalInvestment: "USD 8M",
    description: "Potencia agroindustrial del NOA que ha reconvertido estratégicamente capacidades citrícolas y cañeras hacia la biomasa de cannabis.",
    commercialProjection: "Muy Alta. La base de experiencia exportadora de Tucumán asegura rápida penetración en mercados externos de extractos.",
    legalProjection: "Apoyo orgánico desde SIPROSA y el gobierno, garantizando certificaciones sanitarias expeditivas.",
    mainActors: [
      { name: "SIPROSA", type: "Sistema de Salud", desc: "Órgano regulador y controlador estatal de fitofármacos en el territorio." },
      { name: "EEAOC Tucumán", type: "I+D", desc: "Estación Experimental de inmenso prestigio impulsando ensayos." },
      { name: "Biocann Tucumán", type: "Consorcio PyME", desc: "Empresas diversificando fincas de limoneros." }
    ],
    projects: [{ name: "Bioprocesos Ingenio Cannábico", status: "Fase de Escalado", budget: "USD 3.5M", desc: "Reutilización de infraestructura de molienda y secado." }],
    rdProjects: [
      { name: "Observatorio de Dolor SIPROSA", status: "Activo", desc: "Grandes cohortes de seguimiento clínico en hospitales públicos." },
      { name: "Manejo Integrado Plagas", status: "Activo", desc: "Ensayos EEAOC de control biológico en entornos tropicales." }
    ],
    framework: "Agroindustria Pesada e Integración",
    localNews: [
      { id: "tuc1", title: "Empresas citrícolas de Tucumán invierten capitales en sus primeras naves cannábicas", source: "La Gaceta", date: "Feb 2026", url: "https://www.lagaceta.com.ar" },
      { id: "tuc2", title: "El SIPROSA autoriza un macroensayo clínico pionero y gratuito", source: "El Tucumano", date: "Abr 2026", url: "https://www.eltucumano.com" }
    ]
  }
};

export const TOTAL_STATS = Object.values(PROVINCE_DATA).reduce((acc, curr) => {
  acc.actors += curr.actors;
  acc.ngos += curr.ngos;
  acc.smes += curr.smes;
  acc.rd += curr.rd;
  acc.dispensaries += curr.dispensaries;
  return acc;
}, { actors: 0, ngos: 0, smes: 0, rd: 0, dispensaries: 0 });

export const NEWS_DATA: NewsItem[] = [
  {
    id: "1",
    title: "ARICCAME emite masivamente licencias para la cadena de cáñamo industrial tras su reorganización",
    source: "Télam",
    date: "Ene 2026",
    url: "https://www.argentina.gob.ar/produccion/ariccame"
  },
  {
    id: "2",
    title: "A dos años del cambio normativo: el balance del Reprocann con sus nuevos filtros",
    source: "Infobae",
    date: "May 2026",
    url: "https://www.infobae.com/economia/2026/05/cannabis-argentina"
  },
  {
    id: "3",
    title: "Cannava alcanza récord de exportaciones de derivados a los mercados europeos en 2026",
    source: "Economía y Negocios",
    date: "Mar 2026",
    url: "https://www.cannava.com.ar/"
  },
  {
    id: "4",
    title: "El LIF de Santa Fe introduce un desarrollo genético exclusivo enfocado a neuroterapias",
    source: "Laboratorio Industrial Farmacéutico (LIF)",
    date: "Abr 2026",
    url: "https://www.lifsantafe.com.ar/"
  },
  {
    id: "5",
    title: "Inversión histórica de capitales extranjeros en el Polo Biotecnológico de Mendoza",
    source: "Gobierno de Mendoza",
    date: "Feb 2026",
    url: "https://www.mendoza.gov.ar"
  }
];
