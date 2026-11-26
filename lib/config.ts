// Todo lo editable vive aquí: textos, preguntas, pesos, rangos y tasas.
// Los marcadores como {n} se reemplazan automáticamente.

export const CONFIG = {

  money: { locale: 'en-CA', currency: 'CAD' },

  contact: {
    email: 'contacto@tu-dominio.com',   // ← REEMPLAZAR por el correo real
    phone: '',                          // ej. '+1 604 000 0000' (vacío = no se muestra)
    bookingUrl: '',                     // ej. enlace de Calendly (vacío = se usa el correo)
    subject: 'Quiero agendar una conversación con Wealth GPS'
  },

  ui: {
    skip: 'Saltar al contenido',
    progressLabel: 'Avance de lectura de la página',
    navLabel: 'Navegación principal',
    logoLabel: 'LOGO',
    logoAria: 'Wealth GPS, inicio. Espacio reservado para el logo',
    menuOpen: 'Abrir menú', menuClose: 'Cerrar menú',
    toLight: 'Cambiar a modo claro', toDark: 'Cambiar a modo oscuro',
    yes: 'Sí', no: 'No', prev: 'Anterior', next: 'Siguiente',
    stepOf: 'Paso {n} de {total}', missing: 'Falta responder',
    missingGroup: 'Todavía faltan {n} preguntas por responder. Las marcamos para ti.',
    seeResult: 'Ver mi resultado', editAnswers: 'Cambiar mis respuestas', restart: 'Empezar de nuevo',
    calculate: 'Calcular', editData: 'Editar mis datos',
    copy: 'Copiar resumen', copied: 'Resumen copiado. Ya puedes compartirlo con tu pareja.',
    copyFail: 'No se pudo copiar automáticamente. Selecciona el texto y cópialo.',
    print: 'Imprimir',
    toolLabel: 'Herramienta {n}',
    chooseRange: 'Elige un rango', required: 'Este dato es necesario.',
    currencyNote: 'Todas las cifras están en dólares canadienses (CAD).',
    perMonth: 'al mes', perYear: 'al año'
  },

  nav: [
    { href: '#beneficios', label: 'Beneficios' },
    { href: '#soluciones', label: 'Soluciones' },
    { href: '#wealth-score', label: 'Wealth Score' },
    { href: '#capacidad-ahorro', label: 'Capacidad de ahorro' },
    { href: '#patrimonio', label: 'Patrimonio' },
    { href: '#perfil', label: 'Perfil' },
    { href: '#contacto', label: 'Contacto' }
  ],

  hero: {
    eyebrow: 'Un camino más claro hacia la confianza financiera',
    title: '¿Qué es un GPS financiero?',
    lead: 'Igual que un GPS, primero ubica dónde estás y después traza la ruta hacia a dónde quieres llegar. Wealth GPS te ayuda a mirar la situación completa de tu familia (ahorro, inversión, crédito, seguros, retiro, impuestos y objetivos) y a ordenarla en un plan claro.',
    cta: 'Empieza tu Wealth Score',
    ctaHref: '#wealth-score',
    secondary: 'Ver las cuatro herramientas',
    secondaryHref: '#herramientas',
    note: 'Toma unos minutos. Tus respuestas se quedan en tu navegador: no se guardan ni se envían.',
    rotatingPrefix: 'Una ruta clara para',
    rotatingWords: ['tu ahorro', 'tus inversiones', 'tu crédito', 'tus seguros', 'tu retiro', 'tus objetivos'],
    ticker: ['Ahorro', 'Inversión', 'Crédito', 'Seguros', 'Retiro', 'Impuestos', 'Objetivos', 'Patrimonio'],
    tickerLabel: 'Lo que miramos en tu familia',
    stepsTitle: 'Tu ruta, en dos pasos',
    steps: [
      { icon: 'locate', n: 'PASO 1', title: 'Dónde estoy', text: 'Ubicas tu situación actual: lo que ganas, lo que tienes y lo que debes.' },
      { icon: 'flag', n: 'PASO 2', title: 'A dónde voy', text: 'Defines tus objetivos y trazas la ruta para llegar, tú y tu pareja.' }
    ]
  },

  benefits: {
    kicker: 'Beneficios para tu familia',
    title: 'Lo que gana tu familia al ordenar sus finanzas', accent: 'familia',
    items: [
      { icon: 'compass', title: 'Claridad', text: 'Entienden en pocos minutos cuánto ganan, cuánto tienen y cuánto deben, sin tecnicismos.' },
      { icon: 'couple', title: 'Decisiones en pareja', text: 'Un resumen fácil de compartir para que ambos hablen de dinero con los mismos datos.' },
      { icon: 'shield', title: 'Tranquilidad', text: 'Una familia mejor protegida ante lo inesperado, con seguros y planeación patrimonial.' },
      { icon: 'route', title: 'Un plan con rumbo', text: 'Ahorro, retiro, educación de sus hijos y casa propia en una sola ruta.' }
    ]
  },

  solutions: {
    kicker: 'Soluciones',
    title: 'Problemas comunes, respuestas directas', accent: 'directas',
    intro: 'Si alguna de estas frases suena familiar, estás en el lugar correcto.',
    helpLabel: 'Cómo te ayudamos',
    items: [
      { problem: '«No sé cuánto puedo ahorrar cada mes.»', answer: 'Calculamos tu capacidad de ahorro, apartando primero el 10% de tu ingreso neto.' },
      { problem: '«No sé cuánto tenemos realmente como familia.»', answer: 'Armas tu balance: lo que tienen, lo que deben y su patrimonio neto.' },
      { problem: '«Mi pareja y yo no estamos en la misma página.»', answer: 'Las herramientas funcionan en pareja y te dan un resumen claro para compartir.' },
      { problem: '«Tengo ahorros, pero no sé si alcanzan para el retiro.»', answer: 'El Wealth Score revisa tus cuentas de retiro (TFSA, FHSA, RRSP, RIF y pensión de tu empresa) y te dice qué falta.' },
      { problem: '«El crédito, las inversiones y los seguros me dan desconfianza.»', answer: 'Tu Perfil identifica cómo piensas en cada tema, sin juicios, para empezar desde ahí.' },
      { problem: '«No sé qué pasaría con mi familia si algo me pasa.»', answer: 'Revisamos tus seguros y tu planeación patrimonial (estate planning).' }
    ]
  },

  toolsIntro: {
    kicker: 'Cuatro herramientas, un recorrido',
    title: 'Primero me ubico, luego avanzo', accent: 'avanzo',
    intro: 'Primero me ubico, luego reviso mi flujo de dinero, conozco mi balance y descubro mi perfil. Puedes hacerlas en orden o por separado.'
  },

  cta: {
    kicker: 'Siguiente paso',
    title: 'Conversemos sobre tu ruta', accent: 'ruta',
    lead: 'Con tus resultados en la mano, la conversación es mucho más útil. Agenda una cita y revisamos juntos tu camino, tú y tu pareja.',
    book: 'Agendar una conversación',
    write: 'Escribir un correo',
    includeResults: 'Incluir el resumen de mis resultados en el mensaje',
    noResults: 'Cuando completes alguna herramienta, podrás incluir tu resumen aquí.',
    mailGreeting: 'Hola, me gustaría conversar sobre mi situación financiera.',
    mailResultsTitle: 'Mis resultados:'
  },

  footer: {
    motto: 'Precisión • Confianza • Dirección',
    about: 'Wealth GPS · Guía financiera integral en Canadá.',
    disclaimer: 'Las herramientas de esta página son una guía orientativa. No sustituyen la asesoría financiera, fiscal o legal personalizada, y las estimaciones de impuestos son aproximadas.'
  },

  /* ---------------- HERRAMIENTA 1 · WEALTH SCORE ----------------
     weight = puntos máximos del pilar (5 pilares x 20 = 100).
     Cada pregunta puede llevar points (peso relativo dentro del pilar);
     si se omite, todas las preguntas del pilar pesan igual. */
  wealthScore: {
    id: 'wealth-score', icon: 'gauge',
    kicker: '¿En qué nivel estoy?', title: 'Wealth Score', accent: 'Score',
    intro: 'Un cuestionario breve de sí o no. Cada respuesta positiva suma puntos y, si todas lo fueran, el total sería 100. Al final verás qué pilares ya tienes cubiertos y cuáles quedan por trabajar.',
    pillarOf: 'Pilar {n} de {total}',
    resultTitle: 'Tu Wealth Score', outOf: 'de 100',
    pointsOf: '{n} de {max} puntos',
    pillarsTitle: 'Tus cinco pilares',
    coveredCount: 'Tienes {n} de {total} pilares cubiertos.',
    workFirst: 'Para empezar a trabajar: {name}.',
    allCovered: '¡Excelente! Tus cinco pilares están cubiertos. Lo siguiente es afinarlos.',
    pendingTitle: 'Por revisar:',
    status: { ok: 'Cubierto', mid: 'En progreso', low: 'Por trabajar' },
    thresholds: { covered: 0.8, partial: 0.4 },     // proporción del pilar
    levels: [
      { min: 0,  name: 'Punto de partida', text: 'Aquí empieza tu ruta. Tener claro dónde estás ya es el primer paso importante.' },
      { min: 40, name: 'En camino', text: 'Ya tienes bases. Con algunos ajustes tu plan puede tomar mucha más fuerza.' },
      { min: 70, name: 'Bien encaminado', text: 'Vas muy bien. Quedan pocos pilares por completar para una base sólida.' },
      { min: 90, name: 'Muy sólido', text: 'Tienes una base muy completa. Toca revisarla con regularidad y afinar detalles.' }
    ],
    pillars: [
      { id: 'ahorro', name: 'Ahorro e inversión', icon: 'trend', weight: 20, questions: [
        { text: '¿Ahorras hoy una parte de tu ingreso para tu futuro?' },
        { text: '¿Tienes una cuenta de ahorro o de inversión, aparte de tu cuenta de cheques?' },
        { text: '¿Inviertes en instrumentos como GICs, acciones o bonos?' },
        { text: '¿Tienes inversiones en el extranjero, bienes raíces u otro fondo privado?' }
      ]},
      { id: 'seguros', name: 'Seguros y protección', icon: 'shield', weight: 20, questions: [
        { text: '¿Tu empresa te paga gastos médicos adicionales?' },
        { text: '¿Tienes un seguro de vida que cubra a quienes dependen de ti?' },
        { text: '¿Ese seguro de vida cubriría varios meses de los gastos de tu familia?' },
        { text: '¿Tienes seguro de discapacidad o de enfermedades graves o terminales?' }
      ]},
      { id: 'retiro', name: 'Retiro', icon: 'sunrise', weight: 20, questions: [
        { text: '¿Tienes una cuenta TFSA (ahorro libre de impuestos)?', points: 4 },
        { text: '¿Tienes una cuenta FHSA (ahorro para tu primera casa)?', points: 3 },
        { text: '¿Aportas a un RRSP (plan de ahorro para el retiro)?', points: 4 },
        { text: '¿Tienes un RRSP de pareja (spousal RRSP)?', points: 3 },
        { text: '¿Tienes o planeas un RIF (fondo de ingreso de retiro)?', points: 3 },
        { text: '¿Cuentas con beneficios de pensión de tu empresa?', points: 3 }
      ]},
      { id: 'objetivos', name: 'Objetivos', icon: 'target', weight: 20, questions: [
        { text: '¿Tienes un plan para tu fondo de emergencias?' },
        { text: '¿Tienes un plan para la educación de tus hijos?' },
        { text: '¿Tienes un plan para el pago inicial (down payment) de tu casa?' },
        { text: '¿Tienes un plan para tu retiro?' }
      ]},
      { id: 'estate', name: 'Estate planning', icon: 'estate', weight: 20, questions: [
        { text: '¿Tienes definida tu planeación patrimonial (estate planning)?' },
        { text: '¿Tienes un testamento actualizado?' },
        { text: '¿Tienes beneficiarios nombrados en tus seguros y cuentas?' },
        { text: '¿Sabes cómo se protegería y se transferiría tu patrimonio a tus dependientes?' }
      ]}
    ]
  },

  /* ---------------- HERRAMIENTA 2 · CAPACIDAD DE AHORRO ---------------- */
  savings: {
    id: 'capacidad-ahorro', icon: 'statement',
    kicker: '¿Cuál es mi capacidad de ahorro?', title: 'Capacidad de ahorro', accent: 'ahorro',
    intro: 'Es un estado de resultados de tu hogar: partimos de tu ingreso, apartamos primero tu ahorro personal y después restamos tus gastos. El saldo final dice cuánto puedes ahorrar.',
    personalSavingsRate: 0.10,            // se aparta del ingreso neto ANTES de los gastos
    modeTitle: '¿Cómo quieres hacer el cálculo?',
    modes: {
      single: { label: 'Individual', hint: 'Solo mi ingreso' },
      couple: { label: 'En pareja', hint: 'Sumamos el ingreso de mi pareja' }
    },
    incomeTitle: 'Ingreso anual',
    personTitles: { you: 'Tu ingreso', partner: 'Ingreso de tu pareja' },
    rangeLabel: 'Rango de ingreso anual',
    exactLabel: 'Ingreso anual exacto (opcional)',
    exactHint: 'Si lo escribes, se usa en lugar del punto medio del rango.',
    basisLabel: '¿Este ingreso es bruto o neto?',
    basis: {
      gross: { label: 'Bruto', hint: 'Incluye impuestos' },
      net:   { label: 'Neto',  hint: 'Después de la retención' }
    },
    expensesTitle: 'Gastos mensuales',
    expensesHint: 'Escribe lo que pagas cada mes. Si no aplica, déjalo vacío.',
    expensesHintCouple: 'Escribe el total del hogar, de ambos.',
    expenses: [
      { id: 'food',     label: 'Comida y supermercado' },
      { id: 'housing',  label: 'Hipoteca o renta' },
      { id: 'cards',    label: 'Tarjetas de crédito' },
      { id: 'carLoan',  label: 'Crédito de auto' },
      { id: 'loans',    label: 'Líneas de crédito u otros créditos' }
    ],
    /* estimate = cifra usada si no escribes el monto exacto (punto medio).
       taxRate  = tasa efectiva APROXIMADA (impuestos + deducciones) para pasar de bruto a neto.
       Reemplaza estas tasas con la tabla fiscal oficial cuando la tengas. */
    ranges: [
      { label: '$10,000 – $15,000',   min: 10000,  max: 15000,  estimate: 12500,  taxRate: 0.06 },
      { label: '$15,000 – $35,000',   min: 15000,  max: 35000,  estimate: 25000,  taxRate: 0.14 },
      { label: '$35,000 – $60,000',   min: 35000,  max: 60000,  estimate: 47500,  taxRate: 0.21 },
      { label: '$60,000 – $80,000',   min: 60000,  max: 80000,  estimate: 70000,  taxRate: 0.23 },
      { label: '$81,000 – $110,000',  min: 81000,  max: 110000, estimate: 95500,  taxRate: 0.27 },
      { label: '$111,000 – $141,000', min: 111000, max: 141000, estimate: 126000, taxRate: 0.30 },
      { label: '$141,000 – $180,000', min: 141000, max: 180000, estimate: 160500, taxRate: 0.33 },
      { label: 'Más de $180,000',     min: 180000, max: null,   estimate: 200000, taxRate: 0.37 }
    ],
    text: {
      resultTitle: 'Tu estado de resultados',
      summaryTitle: 'Lo que capturaste',
      mode: 'Modalidad', you: 'Tú', partner: 'Tu pareja',
      incomeGross: 'ingreso bruto', incomeNet: 'ingreso neto',
      exactUsed: 'monto exacto', rangeUsed: 'punto medio del rango',
      tableCaption: 'Estado de resultados del hogar',
      colConcept: 'Concepto', colMonth: 'Al mes', colYear: 'Al año',
      netIncome: 'Ingreso neto',
      personalSaving: 'Ahorro personal ({rate}%), primero',
      available: 'Disponible para gastos',
      expensesGroup: 'Gastos del mes',
      balance: 'Saldo: capacidad de ahorro',
      statPositiveKey: 'Tu capacidad de ahorro',
      statPositive: 'Después de apartar tu ahorro personal y pagar tus gastos, te quedan {amount} al mes para tus objetivos.',
      statTotal: 'Entre tu ahorro personal y tu capacidad de ahorro podrías apartar {amount} al mes.',
      statNegativeKey: 'Necesitas construir ingreso',
      statNegative: 'Tus gastos superan tu ingreso disponible por {amount} al mes. Es un punto de partida, no una sentencia: el reto ahora es aumentar tu ingreso para que ahorrar sea posible.',
      taxNote: 'Indicaste ingreso bruto, así que estimamos el neto con una tasa aproximada de impuestos y deducciones. No es un cálculo oficial.',
      estimateNote: 'Cuando no escribes el monto exacto, usamos el punto medio del rango como estimación.',
      errIncome: 'Elige un rango o escribe tu ingreso anual.',
      errBasis: 'Indica si tu ingreso es bruto o neto.'
    }
  },

  /* ---------------- HERRAMIENTA 3 · PATRIMONIO ---------------- */
  netWorth: {
    id: 'patrimonio', icon: 'balance',
    kicker: '¿Cuál es mi patrimonio?', title: 'Patrimonio', accent: 'Patrimonio',
    intro: 'Es un balance: de un lado lo que tienes (tus bienes personales) y del otro lo que debes. La diferencia es tu patrimonio neto.',
    modeTitle: '¿Cómo quieres hacer el cálculo?',
    modes: {
      single: { label: 'Individual', hint: 'Solo mis datos' },
      couple: { label: 'En pareja', hint: 'Sumamos los datos de mi pareja' }
    },
    coupleHint: 'En el cálculo en pareja, escribe el total de ambos, salvo donde se pida un dato por separado.',
    fieldHint: 'Si no aplica, déjalo vacío.',
    /* factor: multiplica el monto capturado antes de sumarlo (1 = tal cual).
       Las primas de seguro se piden "al mes"; usa 12 si prefieres anualizarlas. */
    sections: [
      { id: 'cuentas', kind: 'cuentas', icon: 'wallet', title: 'Mis cuentas',
        hint: 'Su suma es tu dinero disponible en corto y mediano plazo.', fields: [
        { id: 'cash',        label: 'Dinero en efectivo (en cartera)' },
        { id: 'chequing',    label: 'Chequera', hint: 'Saldo en cuenta de débito o chequera' },
        { id: 'investments', label: 'Saldo en inversiones', hint: 'Fondos, fondos segregados (segregated funds), fondos mutuos (mutual funds), acciones, inversiones privadas u otro' }
      ]},
      { id: 'bienes', kind: 'bienes', icon: 'home', title: 'Mis bienes',
        hint: 'Lo que tienes, a su valor aproximado.', fields: [
        { id: 'home',          label: 'Valor aproximado de tu casa actual' },
        { id: 'car',           label: 'Valor de tu auto actual', hint: 'A valor de mercado: cuánto crees que obtendrías por tu coche' },
        { id: 'carPartner',    label: 'Valor del auto de tu pareja', coupleOnly: true },
        { id: 'carKids',       label: 'Valor de los autos de tus hijos', coupleOnly: true },
        { id: 'lifeInsurance', label: 'Valor de tus seguros de vida', hint: 'Cuánto le entregarían a tu familia en caso de fallecimiento: el tuyo, el de tu pareja o un contrato conjunto' },
        { id: 'business',      label: 'Valor de tu negocio, franquicia o sociedad', hint: 'Cuánto crees que vale' }
      ]},
      { id: 'deudas', kind: 'deudas', icon: 'card', title: 'Lo que debo',
        hint: 'Todo lo que se resta de tus bienes personales.', fields: [
        { id: 'cc',         label: 'Tarjetas de crédito' },
        { id: 'ccPartner',  label: 'Tarjetas de crédito de tu pareja', coupleOnly: true },
        { id: 'student',    label: 'Créditos educativos' },
        { id: 'mortgage',   label: 'Hipoteca' },
        { id: 'premiums',   label: 'Primas de seguro mensuales', hint: 'Monto que pagas al mes', factor: 1 },
        { id: 'carIns',     label: 'Seguros de tus autos', hint: 'Monto que pagas al mes', factor: 1 },
        { id: 'carLoan',    label: 'Crédito de tus autos' },
        { id: 'loc',        label: 'Línea de crédito personal' },
        { id: 'employer',   label: 'Crédito con tu empresa o con el fondo de ahorro' },
        { id: 'friends',    label: 'Crédito con amigos y conocidos' }
      ]}
    ],
    text: {
      resultTitle: 'Tu balance',
      summaryTitle: 'Lo que capturaste',
      mode: 'Modalidad',
      tableCaption: 'Balance de bienes personales y deudas',
      colConcept: 'Concepto', colAmount: 'Monto',
      subCuentas: 'Dinero disponible en corto y mediano plazo',
      subBienes: 'Total de mis bienes',
      totalAssets: 'Total de bienes personales',
      totalDebts: 'Total de lo que debo',
      netWorth: 'Patrimonio neto',
      statKey: 'Tu patrimonio neto',
      statPositive: 'Tus bienes personales ({assets}) superan lo que debes ({debts}).',
      statNegative: 'Hoy lo que debes ({debts}) supera tus bienes personales ({assets}). Es un punto de partida: con un plan, esta cifra puede cambiar.',
      barAssets: 'Bienes personales', barDebts: 'Deudas',
      empty: 'Sin datos', errAny: 'Escribe al menos un monto para calcular tu patrimonio.'
    }
  },

  /* ---------------- HERRAMIENTA 4 · PERFIL ----------------
     Cada pregunta trae 4 respuestas, ordenadas del nivel 1 (más avanzado) al 4.
     El nivel del área es el promedio redondeado de las respuestas. */
  profile: {
    id: 'perfil', icon: 'profile',
    kicker: '¿Cuál es mi perfil?', title: 'Perfil', accent: 'Perfil',
    intro: 'Unas preguntas cortas para descubrir tu perfil en cada área. No recibes un solo perfil general, sino uno por tema, y no hay respuestas buenas ni malas.',
    resultTitle: 'Tus cinco perfiles',
    levelOf: 'Nivel {n} de 4',
    areaOf: 'Área {n} de {total}',
    areas: [
      { id: 'credito', name: 'Crédito', icon: 'card',
        levels: [
          { name: 'Perfecto', text: 'Usas el crédito a tu favor, estás apalancado en un porcentaje adecuado y obtienes el mejor rendimiento del dinero prestado.' },
          { name: 'Maduro', text: 'Usas la tarjeta y la pagas completa; tu hipoteca es moderada y el pago mensual no supera el 30% de tu ingreso total.' },
          { name: 'Incómodo con el crédito', text: 'Pagas solo los mínimos de tu tarjeta, no tienes crédito hipotecario y acostumbras pedir prestado a amigos y conocidos.' },
          { name: 'Escéptico total', text: 'No crees en el crédito ni en los bancos, y sientes que el banco te va a robar.' }
        ],
        questions: [
          { text: '¿Cómo usas tu tarjeta de crédito?', options: [
            'La uso a mi favor para obtener el mejor rendimiento del dinero que pido prestado',
            'La uso y la pago completa cada mes',
            'Pago solo el mínimo',
            'No la uso: no confío en los bancos' ] },
          { text: '¿Cómo es tu relación con las deudas y la hipoteca?', options: [
            'Tengo deuda en un porcentaje adecuado y me da beneficio',
            'Mi hipoteca es moderada y el pago no pasa del 30% de mi ingreso',
            'Prefiero no tener hipoteca y evito las deudas',
            'No creo en el crédito' ] },
          { text: 'Cuando necesitas dinero prestado, ¿a quién acudes?', options: [
            'Comparo opciones y elijo la que más me conviene',
            'Al banco, con un pago mensual que puedo cubrir',
            'A amigos y conocidos',
            'A nadie: siento que el banco me va a robar' ] }
        ]},
      { id: 'inversiones', name: 'Inversiones', icon: 'trend',
        levels: [
          { name: 'Experto', text: 'Has estudiado y conoces los productos; usas cuentas sin costo y con beneficio fiscal, e incluso ingeniería financiera con créditos e impuestos a tu favor.' },
          { name: 'Maduro', text: 'Inviertes en fondos mutuos (mutual funds) y, a veces, en paquetes de mediano a largo plazo para la educación de tus hijos o tu retiro.' },
          { name: 'Escéptico', text: 'Te preocupa que caiga la bolsa y mantienes tu dinero en GICs o pagarés, algo muy básico.' },
          { name: 'Escéptico total', text: 'Estás atorado con los créditos, sin capacidad de ahorro o inversión; tu dinero queda en la cuenta de cheques, sin ganar intereses y pagando por la cuenta.' }
        ],
        questions: [
          { text: '¿Qué tanto conoces tus inversiones?', options: [
            'He estudiado los productos y elijo los que más me convienen',
            'Conozco lo básico y sé en qué fondos invierto',
            'Muy poco: prefiero lo más sencillo',
            'No invierto' ] },
          { text: '¿Dónde está hoy la mayor parte de tu dinero ahorrado?', options: [
            'En cuentas sin costo y con beneficio fiscal',
            'En fondos mutuos o paquetes a mediano y largo plazo',
            'En GICs o pagarés',
            'En la cuenta de cheques, sin ganar intereses' ] },
          { text: '¿Qué sientes cuando la bolsa baja?', options: [
            'Entiendo que es parte del ciclo y lo aprovecho',
            'Me preocupo, pero mantengo mi plan',
            'Me da miedo y prefiero lo más seguro',
            'No tengo cómo invertir ahora' ] }
        ]},
      { id: 'seguros', name: 'Seguros', icon: 'shield',
        levels: [
          { name: 'Estratégico', text: 'Usas los seguros a tu favor y generas fideicomisos para transferir tu patrimonio a tus dependientes; tu seguro de vida se ajusta a tu edad, con más cobertura cuando ellos más la necesitan.' },
          { name: 'Maduro', text: 'Tienes el seguro de vida de tu empresa, aseguras tus autos y cuentas con seguro de accidentes o de enfermedades graves.' },
          { name: 'Escéptico', text: 'No tienes seguro propio o tienes uno pequeño y muy básico, y piensas que la aseguradora no te va a pagar.' },
          { name: 'Desinteresado total', text: 'No tienes seguros y no te interesa saber de seguros.' }
        ],
        questions: [
          { text: '¿Cómo es tu seguro de vida?', options: [
            'Es flexible: se ajusta a mi edad y cubre más cuando mis dependientes más lo necesitan',
            'Tengo el de mi empresa',
            'Tengo uno pequeño y básico que me dieron o me vendieron',
            'No tengo' ] },
          { text: '¿Qué otros seguros tienes?', options: [
            'Fideicomisos y seguros para transferir mi patrimonio',
            'Seguro de autos y de accidentes o enfermedades graves',
            'Solo lo mínimo',
            'Ninguno' ] },
          { text: '¿Qué piensas de las aseguradoras?', options: [
            'Las uso a mi favor como parte de mi plan',
            'Confío en ellas para lo importante',
            'Dudo que me paguen cuando lo necesite',
            'No me interesa el tema' ] }
        ]},
      { id: 'objetivos', name: 'Objetivos', icon: 'target',
        levels: [
          { name: 'Experto', text: 'Usas todos los servicios a tu favor (crédito, inversiones, seguros y fideicomisos) con beneficio fiscal y traspaso patrimonial.' },
          { name: 'Maduro', text: 'Tienes al menos una cuenta para fondos o ETFs, o una aplicación que te facilita comprar y vender.' },
          { name: 'Nivel 3', text: 'Tienes solo lo que te han dado, sin objetivos claros; todo te cae encima y esperas que la pensión del gobierno sea suficiente, cosa que no es cierta.' },
          { name: 'Escéptico total', text: 'Gastas todo tu dinero en el día a día: «me lo gasto antes de que se lo gaste alguien más».' }
        ],
        questions: [
          { text: '¿Cómo usas los servicios financieros para tus metas?', options: [
            'Combino crédito, inversiones, seguros y fideicomisos con beneficio fiscal',
            'Tengo una cuenta de fondos o ETFs, o una app para comprar y vender',
            'Tengo solo lo que me han dado',
            'No uso ninguno' ] },
          { text: '¿Qué tan claros son tus objetivos?', options: [
            'Muy claros, con un plan fiscal y de traspaso patrimonial',
            'Claros, y tengo una cuenta para ellos',
            'Poco claros: todo me cae encima',
            'No tengo: vivo al día' ] },
          { text: 'Cuando te sobra dinero a fin de mes, ¿qué haces?', options: [
            'Lo dirijo a mis objetivos según un plan',
            'Lo aparto en una cuenta con propósito',
            'Espero que la pensión del gobierno alcance',
            'Me lo gasto antes de que se lo gaste alguien más' ] }
        ]},
      { id: 'retiro', name: 'Retiro', icon: 'sunrise',
        levels: [
          { name: 'Estratégico', text: 'Tienes un plan de retiro personal, uno con tu pareja y uno con tu empresa, con diversos instrumentos; además compras inversiones pasivas (un departamento, una oficina, una franquicia) para tener ingresos en el retiro.' },
          { name: 'Maduro', text: 'Tienes los planes de tu empresa y llevas al máximo el beneficio de tu RRSP.' },
          { name: 'Escéptico', text: 'Solo tienes lo que te da tu empresa, no aportas a tu RRSP y consideras que el plan de pensión canadiense te cubrirá al llegar a la edad de retiro.' },
          { name: 'Sin plan', text: 'No sabes si tienes plan en tu trabajo y piensas que el gobierno se hará cargo de tus gastos cuando seas mayor.' }
        ],
        questions: [
          { text: '¿Qué plan de retiro tienes?', options: [
            'Uno personal, uno con mi pareja y uno con mi empresa',
            'Los de mi empresa, y llevo mi RRSP al máximo',
            'Solo lo que me da mi empresa',
            'No sé si tengo plan' ] },
          { text: '¿Tienes ingresos pensados para tu retiro además de tu plan?', options: [
            'Sí, compro inversiones pasivas: un departamento, una oficina o una franquicia',
            'Algunos, pero mi base es mi plan de ahorro',
            'No: confío en la pensión canadiense',
            'No lo he pensado' ] },
          { text: '¿Quién cubrirá tus gastos cuando te retires?', options: [
            'Mi plan, que incluso cubre los gastos de transferir mi patrimonio',
            'Mi plan de la empresa y mi RRSP',
            'El plan de pensión canadiense',
            'El gobierno' ] }
        ]}
    ]
  }
};
