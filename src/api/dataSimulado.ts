
export const dataCentroGeografico = [
  { id_geographic_center: 1, name: "Centro 1" },
  { id_geographic_center: 2, name: "Centro 2" },
  { id_geographic_center: 3, name: "Centro 3" },
  { id_geographic_center: 4, name: "Centro 4" },
  { id_geographic_center: 5, name: "Centro 5" },
  { id_geographic_center: 6, name: "Centro 6" },
  { id_geographic_center: 7, name: "Centro 7" },
];

export const dataAlmacen = [
    { id_store: 1, id_geographic_center: 1, name: "Almacén A", code : "" }, 
    { id_store: 2, id_geographic_center: 6, name: "Almacén A", code : "" }, 
    { id_store: 3, id_geographic_center: 2, name: "Almacén B", code : "" }, 
    { id_store: 4, id_geographic_center: 5, name: "Almacén B", code : "" }, 
    { id_store: 5, id_geographic_center: 3, name: "Almacén C", code : "" }, 
    { id_store: 6, id_geographic_center: 4, name: "Almacén D", code : "" }, 
    { id_store: 7, id_geographic_center: 1, name: "Almacén D", code : "" }, 
    { id_store: 8, id_geographic_center: 5, name: "Almacén E", code : "" }, 
    { id_store: 9, id_geographic_center: 2, name: "Almacén E", code : "" }, 
  ];

  export const epp = [
    { id_epp: 1 , name: 'GUANTES LATEX', code: 'C-001', category: 'Guantes', state: 1 },
    { id_epp: 2 , name: 'MASCARILLA KN95', code: 'C-002', category: 'Mascarillas', state: 1 },
    { id_epp: 3 , name: 'GAFAS DE IMPACTO', code: 'C-003', category: 'Gafas', state: 1 },
    { id_epp: 4 , name: 'CHALECO', code: 'C-004', category: 'Chalecos', state: 1 },
    { id_epp: 5 , name: 'GUANTES DE NITRILO', code: 'C-005', category: 'Guantes', state: 1 },
    { id_epp: 6 , name: 'GUANTES ANTIPUNZONES', code: 'C-006', category: 'Guantes', state: 1 },
    { id_epp: 7 , name: 'MASCARILLA QUIRÚRGICA', code: 'C-007', category: 'Mascarillas', state: 1 },
    { id_epp: 8 , name: 'GAFAS DE SEGURIDAD', code: 'C-008', category: 'Gafas', state: 1 },
    { id_epp: 9 , name: 'CASCO DE SEGURIDAD', code: 'C-009', category: 'Cascos', state: 1 },
    { id_epp: 10 , name: 'BOTAS DE SEGURIDAD', code: 'C-010', category: 'Calzado', state: 1 },
    { id_epp: 11 , name: 'CHALECO REFLECTANTE', code: 'C-011', category: 'Chalecos', state: 1 },
    { id_epp: 12 , name: 'ARNÉS DE SEGURIDAD', code: 'C-012', category: 'Arneses', state: 1 },
    { id_epp: 13 , name: 'PROTECTOR AUDITIVO', code: 'C-013', category: 'Protección auditiva', state: 1 },
    { id_epp: 14 , name: 'TAPONES AUDITIVOS', code: 'C-014', category: 'Protección auditiva', state: 1 },
    { id_epp: 15 , name: 'ROPA ANTIESTÁTICA', code: 'C-015', category: 'Ropa de protección', state: 1 },
    { id_epp: 16 , name: 'GUANTES TÉRMICOS', code: 'C-016', category: 'Guantes', state: 1 },
    { id_epp: 17 , name: 'POLAINAS IGNÍFUGAS', code: 'C-017', category: 'Polainas', state: 1 },
    { id_epp: 18 , name: 'GUANTES ANTICORTE', code: 'C-018', category: 'Guantes', state: 1 },
    { id_epp: 19 , name: 'PANTALONES ANTICORTE', code: 'C-019', category: 'Ropa de protección', state: 1 },
    { id_epp: 20 , name: 'BOTAS ANTIDESLIZANTES', code: 'C-020', category: 'Calzado', state: 1 },
    { id_epp: 21 , name: 'PROTECTOR FACIAL', code: 'C-021', category: 'Protección facial', state: 1 },
    { id_epp: 22 , name: 'OVEROL DE SEGURIDAD', code: 'C-022', category: 'Ropa de protección', state: 1 },
    { id_epp: 23 , name: 'MASCARILLA FFP2', code: 'C-023', category: 'Mascarillas', state: 1 },
    { id_epp: 24 , name: 'PROTECTOR OCULAR', code: 'C-024', category: 'Protección ocular', state: 1 }
  ];

  export const epp_almacen = [
    { id_epp_store: 1, quantity: 10, store_id: 1, epp_id: 1 },  // GUANTES LATEX en Almacén A (centro 1)
    { id_epp_store: 2, quantity: 5, store_id: 2, epp_id: 2 },   // MASCARILLA KN95 en Almacén A (centro 6)
    { id_epp_store: 3, quantity: 8, store_id: 3, epp_id: 3 },   // GAFAS DE IMPACTO en Almacén B (centro 2)
    { id_epp_store: 4, quantity: 12, store_id: 4, epp_id: 4 },  // CHALECO en Almacén B (centro 5)
    { id_epp_store: 5, quantity: 20, store_id: 5, epp_id: 5 },  // GUANTES DE NITRILO en Almacén C (centro 3)
    { id_epp_store: 6, quantity: 15, store_id: 6, epp_id: 6 },  // GUANTES ANTIPUNZONES en Almacén D (centro 4)
    { id_epp_store: 7, quantity: 7, store_id: 7, epp_id: 7 },   // MASCARILLA QUIRÚRGICA en Almacén D (centro 1)
    { id_epp_store: 8, quantity: 25, store_id: 8, epp_id: 8 },  // GAFAS DE SEGURIDAD en Almacén E (centro 5)
    { id_epp_store: 9, quantity: 30, store_id: 9, epp_id: 9 },  // CASCO DE SEGURIDAD en Almacén E (centro 2)
    { id_epp_store: 10, quantity: 5, store_id: 1, epp_id: 10 }, // BOTAS DE SEGURIDAD en Almacén A (centro 1)
    { id_epp_store: 11, quantity: 8, store_id: 2, epp_id: 11 }, // CHALECO REFLECTANTE en Almacén A (centro 6)
    { id_epp_store: 12, quantity: 10, store_id: 3, epp_id: 12 }, // ARNÉS DE SEGURIDAD en Almacén B (centro 2)
    { id_epp_store: 13, quantity: 6, store_id: 4, epp_id: 13 }, // PROTECTOR AUDITIVO en Almacén B (centro 5)
    { id_epp_store: 14, quantity: 15, store_id: 5, epp_id: 14 }, // TAPONES AUDITIVOS en Almacén C (centro 3)
    { id_epp_store: 15, quantity: 10, store_id: 6, epp_id: 15 }, // ROPA ANTIESTÁTICA en Almacén D (centro 4)
    { id_epp_store: 16, quantity: 20, store_id: 7, epp_id: 16 }, // GUANTES TÉRMICOS en Almacén D (centro 1)
    { id_epp_store: 17, quantity: 12, store_id: 8, epp_id: 17 }, // POLAINAS IGNÍFUGAS en Almacén E (centro 5)
    { id_epp_store: 18, quantity: 18, store_id: 9, epp_id: 18 }, // GUANTES ANTICORTE en Almacén E (centro 2)
    { id_epp_store: 19, quantity: 22, store_id: 1, epp_id: 19 }, // PANTALONES ANTICORTE en Almacén A (centro 1)
    { id_epp_store: 20, quantity: 16, store_id: 2, epp_id: 20 }, // BOTAS ANTIDESLIZANTES en Almacén A (centro 6)
  ];


  // -- Data para la tabla de requerimientos

  // export const dataConsultaEpp = [
  //   { numero: 1, codigo: "C-001", nombre: "GUANTES LATEX", categoria: "Guantes", unidad: "Par", stock: 522, almacen: "Almacén A", centroGeografico: "Centro 1" },
  //   { numero: 2, codigo: "C-002", nombre: "MASCARILLA KN95", categoria: "Mascarillas", unidad: "Unidad", stock: 248, almacen: "Almacén B", centroGeografico: "Centro 2" },
  //   { numero: 3, codigo: "C-003", nombre: "GAFAS DE IMPACTO", categoria: "Gafas", unidad: "Unidad", stock: 600, almacen: "Almacén C", centroGeografico: "Centro 3" },
  //   { numero: 4, codigo: "C-004", nombre: "CHALECO", categoria: "Chalecos", unidad: "Unidad", stock: 451, almacen: "Almacén D", centroGeografico: "Centro 4" },
  //   { numero: 5, codigo: "C-005", nombre: "BOTAS ANTIESTÉTICOS", categoria: "Botas", unidad: "Par", stock: 562, almacen: "Almacén E", centroGeografico: "Centro 5" },
  //   { numero: 6, codigo: "C-006", nombre: "PROTECTORES AUDITIVOS", categoria: "Auriculares", unidad: "Unidad", stock: 124, almacen: "Almacén A", centroGeografico: "Centro 6" },
  //   { numero: 7, codigo: "C-007", nombre: "CASCO DE SEGURIDAD", categoria: "Cascos", unidad: "Unidad", stock: 315, almacen: "Almacén B", centroGeografico: "Centro 1" },
  //   { numero: 8, codigo: "C-008", nombre: "GUANTES ANTICORTE", categoria: "Guantes", unidad: "Par", stock: 189, almacen: "Almacén C", centroGeografico: "Centro 2" },
  //   { numero: 9, codigo: "C-009", nombre: "MASCARILLA FFP2", categoria: "Mascarillas", unidad: "Unidad", stock: 735, almacen: "Almacén D", centroGeografico: "Centro 3" },
  //   { numero: 10, codigo: "C-010", nombre: "PANTALLA FACIAL", categoria: "Protección Facial", unidad: "Unidad", stock: 210, almacen: "Almacén E", centroGeografico: "Centro 4" },
  //   { numero: 11, codigo: "C-011", nombre: "ARNÉS DE SEGURIDAD", categoria: "Protección Caídas", unidad: "Unidad", stock: 98, almacen: "Almacén A", centroGeografico: "Centro 5" },
  //   { numero: 12, codigo: "C-012", nombre: "ZAPATOS DE SEGURIDAD", categoria: "Calzado", unidad: "Par", stock: 423, almacen: "Almacén B", centroGeografico: "Centro 6" },
  //   { numero: 13, codigo: "C-013", nombre: "OVEROL PROTECTOR", categoria: "Ropa Protectora", unidad: "Unidad", stock: 167, almacen: "Almacén C", centroGeografico: "Centro 1" },
  //   { numero: 14, codigo: "C-014", nombre: "RESPIRADOR MEDIA CARA", categoria: "Protección Respiratoria", unidad: "Unidad", stock: 89, almacen: "Almacén D", centroGeografico: "Centro 2" },
  //   { numero: 15, codigo: "C-015", nombre: "GUANTES DIELÉCTRICOS", categoria: "Guantes", unidad: "Par", stock: 76, almacen: "Almacén E", centroGeografico: "Centro 3" },
  //   { numero: 16, codigo: "C-016", nombre: "TAPONES AUDITIVOS", categoria: "Protección Auditiva", unidad: "Par", stock: 850, almacen: "Almacén A", centroGeografico: "Centro 4" },
  //   { numero: 17, codigo: "C-017", nombre: "POLAINAS SOLDADOR", categoria: "Protección Soldadura", unidad: "Par", stock: 54, almacen: "Almacén B", centroGeografico: "Centro 5" },
  //   { numero: 18, codigo: "C-018", nombre: "MANDIL DE CUERO", categoria: "Ropa Protectora", unidad: "Unidad", stock: 112, almacen: "Almacén C", centroGeografico: "Centro 6" },
  //   { numero: 19, codigo: "C-019", nombre: "LÍNEA DE VIDA", categoria: "Protección Caídas", unidad: "Unidad", stock: 38, almacen: "Almacén D", centroGeografico: "Centro 1" },
  //   { numero: 20, codigo: "C-020", nombre: "GAFAS PARA SOLDADURA", categoria: "Protección Ocular", unidad: "Unidad", stock: 95, almacen: "Almacén E", centroGeografico: "Centro 2" }
  // ];

  export const dataConsultaEpp = [
    { numero: 1, codigo: "C-001", nombre: "GUANTES LATEX", categoria: "Guantes", unidad: "Par", stock: 522, almacen: "Almacén A", centroGeografico: "Centro 1", id_geographic_center: 1, id_store: 1 },
    { numero: 2, codigo: "C-002", nombre: "MASCARILLA KN95", categoria: "Mascarillas", unidad: "Unidad", stock: 248, almacen: "Almacén B", centroGeografico: "Centro 2", id_geographic_center: 2, id_store: 3 },
    { numero: 3, codigo: "C-003", nombre: "GAFAS DE IMPACTO", categoria: "Gafas", unidad: "Unidad", stock: 600, almacen: "Almacén C", centroGeografico: "Centro 3", id_geographic_center: 3, id_store: 5 },
    { numero: 4, codigo: "C-004", nombre: "CHALECO", categoria: "Chalecos", unidad: "Unidad", stock: 451, almacen: "Almacén D", centroGeografico: "Centro 4", id_geographic_center: 4, id_store: 6 },
    { numero: 5, codigo: "C-005", nombre: "BOTAS ANTIESTÉTICOS", categoria: "Botas", unidad: "Par", stock: 562, almacen: "Almacén E", centroGeografico: "Centro 5", id_geographic_center: 5, id_store: 8 },
    { numero: 6, codigo: "C-006", nombre: "PROTECTORES AUDITIVOS", categoria: "Auriculares", unidad: "Unidad", stock: 124, almacen: "Almacén A", centroGeografico: "Centro 6", id_geographic_center: 6, id_store: 2 },
    { numero: 7, codigo: "C-007", nombre: "CASCO DE SEGURIDAD", categoria: "Cascos", unidad: "Unidad", stock: 315, almacen: "Almacén B", centroGeografico: "Centro 1", id_geographic_center: 1, id_store: 7 },
    { numero: 8, codigo: "C-008", nombre: "GUANTES ANTICORTE", categoria: "Guantes", unidad: "Par", stock: 189, almacen: "Almacén C", centroGeografico: "Centro 2", id_geographic_center: 2, id_store: 9 },
    { numero: 9, codigo: "C-009", nombre: "MASCARILLA FFP2", categoria: "Mascarillas", unidad: "Unidad", stock: 735, almacen: "Almacén D", centroGeografico: "Centro 3", id_geographic_center: 3, id_store: 7 },
    { numero: 10, codigo: "C-010", nombre: "PANTALLA FACIAL", categoria: "Protección Facial", unidad: "Unidad", stock: 210, almacen: "Almacén E", centroGeografico: "Centro 4", id_geographic_center: 4, id_store: 8 },
    { numero: 11, codigo: "C-011", nombre: "ARNÉS DE SEGURIDAD", categoria: "Protección Caídas", unidad: "Unidad", stock: 98, almacen: "Almacén A", centroGeografico: "Centro 5", id_geographic_center: 5, id_store: 11 },
    { numero: 12, codigo: "C-012", nombre: "ZAPATOS DE SEGURIDAD", categoria: "Calzado", unidad: "Par", stock: 423, almacen: "Almacén B", centroGeografico: "Centro 6", id_geographic_center: 6, id_store: 12 },
    { numero: 13, codigo: "C-013", nombre: "OVEROL PROTECTOR", categoria: "Ropa Protectora", unidad: "Unidad", stock: 167, almacen: "Almacén C", centroGeografico: "Centro 1", id_geographic_center: 1, id_store: 13 },
    { numero: 14, codigo: "C-014", nombre: "RESPIRADOR MEDIA CARA", categoria: "Protección Respiratoria", unidad: "Unidad", stock: 89, almacen: "Almacén D", centroGeografico: "Centro 2", id_geographic_center: 2, id_store: 14 },
    { numero: 15, codigo: "C-015", nombre: "GUANTES DIELÉCTRICOS", categoria: "Guantes", unidad: "Par", stock: 76, almacen: "Almacén E", centroGeografico: "Centro 3", id_geographic_center: 3, id_store: 15 },
    { numero: 16, codigo: "C-016", nombre: "TAPONES AUDITIVOS", categoria: "Protección Auditiva", unidad: "Par", stock: 850, almacen: "Almacén A", centroGeografico: "Centro 4", id_geographic_center: 4, id_store: 16 },
    { numero: 17, codigo: "C-017", nombre: "POLAINAS SOLDADOR", categoria: "Protección Soldadura", unidad: "Par", stock: 54, almacen: "Almacén B", centroGeografico: "Centro 5", id_geographic_center: 5, id_store: 17 },
    { numero: 18, codigo: "C-018", nombre: "MANDIL DE CUERO", categoria: "Ropa Protectora", unidad: "Unidad", stock: 112, almacen: "Almacén C", centroGeografico: "Centro 6", id_geographic_center: 6, id_store: 18 },
    { numero: 19, codigo: "C-019", nombre: "LÍNEA DE VIDA", categoria: "Protección Caídas", unidad: "Unidad", stock: 38, almacen: "Almacén D", centroGeografico: "Centro 1", id_geographic_center: 1, id_store: 19 },
    { numero: 20, codigo: "C-020", nombre: "GAFAS PARA SOLDADURA", categoria: "Protección Ocular", unidad: "Unidad", stock: 95, almacen: "Almacén E", centroGeografico: "Centro 2", id_geographic_center: 2, id_store: 20 },
    
    { numero: 21, codigo: "C-021", nombre: "PROTECTOR FACIAL", categoria: "Protección Facial", unidad: "Unidad", stock: 170, almacen: "Almacén A", centroGeografico: "Centro 1", id_geographic_center: 1, id_store: 1 },
    { numero: 22, codigo: "C-022", nombre: "GUANTES RESISTENTES", categoria: "Guantes", unidad: "Par", stock: 232, almacen: "Almacén B", centroGeografico: "Centro 2", id_geographic_center: 2, id_store: 3 },
    { numero: 23, codigo: "C-023", nombre: "MASCARILLA 3M", categoria: "Mascarillas", unidad: "Unidad", stock: 342, almacen: "Almacén C", centroGeografico: "Centro 3", id_geographic_center: 3, id_store: 5 },
    { numero: 24, codigo: "C-024", nombre: "OVEROL IGNÍFUGO", categoria: "Ropa Protectora", unidad: "Unidad", stock: 75, almacen: "Almacén D", centroGeografico: "Centro 4", id_geographic_center: 4, id_store: 6 },
    { numero: 25, codigo: "C-025", nombre: "BOTAS DE SEGURIDAD", categoria: "Botas", unidad: "Par", stock: 500, almacen: "Almacén E", centroGeografico: "Centro 5", id_geographic_center: 5, id_store: 8 },
    { numero: 26, codigo: "C-026", nombre: "PROTECTOR AUDITIVO PELTOR", categoria: "Auriculares", unidad: "Unidad", stock: 421, almacen: "Almacén A", centroGeografico: "Centro 6", id_geographic_center: 6, id_store: 2 },
    { numero: 27, codigo: "C-027", nombre: "GORRA PROTECTORA", categoria: "Cascos", unidad: "Unidad", stock: 220, almacen: "Almacén B", centroGeografico: "Centro 1", id_geographic_center: 1, id_store: 7 }
  ];
  

  // --- Para la matriz 

  // array de los puestos

export const dataPuestos = [
    { id_appointment: 1, name: 'Almacenero' },
    { id_appointment: 2, name: 'Operario' },
    { id_appointment: 3, name: 'Técnico' },
    { id_appointment: 4, name: 'Supervisor' },
    { id_appointment: 5, name: 'Ingeniero' },
    { id_appointment: 6, name: 'Coordinador' },
    { id_appointment: 7, name: 'Jefe de Almacén' },
    { id_appointment: 8, name: 'Asistente' },
    { id_appointment: 9, name: 'Administrador' },
    { id_appointment: 10, name: 'Analista' }
  ];



  // Array de Gerencias
export const dataGerencias = [
  { id_management: 1, name: 'Fabrica' },
  { id_management: 2, name: 'Administrativa' },
  { id_management: 3, name: 'Campo' },
  { id_management: 4, name: 'RRHH' }
];

// Array de Áreas
export const dataAreas = [
  { id_area: 1, name: 'Area 1', id_management: 1 },
  { id_area: 2, name: 'Area 2', id_management: 1 },
  { id_area: 3, name: 'Area 3', id_management: 2 },
  { id_area: 4, name: 'Area 4', id_management: 2 },
  { id_area: 5, name: 'Area 5', id_management: 3 },
  { id_area: 6, name: 'Area 6', id_management: 3 },
  { id_area: 7, name: 'Area 7', id_management: 4 },
  { id_area: 8, name: 'Area 8', id_management: 4 }
];

// Array de Departamentos
export const dataDepartamentos = [
  { id_department: 1, name: 'Departamento 1', id_area: 1 },
  { id_department: 2, name: 'Departamento 2', id_area: 1 },
  { id_department: 3, name: 'Departamento 3', id_area: 2 },
  { id_department: 4, name: 'Departamento 4', id_area: 2 },
  { id_department: 5, name: 'Departamento 5', id_area: 3 },
  { id_department: 6, name: 'Departamento 6', id_area: 3 },
  { id_department: 7, name: 'Departamento 7', id_area: 4 },
  { id_department: 8, name: 'Departamento 8', id_area: 4 }
];

// -- para las categorias

export const dataCategories = [
  { id_category: 1, name: 'Guantes' },
  { id_category: 2, name: 'Mascarillas' },
  { id_category: 3, name: 'Gafas' },
  { id_category: 4, name: 'Chalecos' },
  { id_category: 5, name: 'Botas' },
  { id_category: 6, name: 'Auriculares' },
  { id_category: 7, name: 'Casco' },
  { id_category: 8, name: 'Protectores de cara' },
  { id_category: 9, name: 'Protectores de respiración' },
  { id_category: 10, name: 'Ropa de trabajo' }
];

export const dataEpp = [
  { id_epp: 1, name: 'GUANTES LATEX', id_category: 1 },
  { id_epp: 2, name: 'GUANTES NITRILO', id_category: 1 },
  { id_epp: 3, name: 'MASCARILLAS KN95', id_category: 2 },
  { id_epp: 4, name: 'MASCARILLAS QUIRURGICAS', id_category: 2 },
  { id_epp: 5, name: 'GAFAS DE PROTECCION', id_category: 3 },
  { id_epp: 6, name: 'GAFAS ANTIVAHO', id_category: 3 },
  { id_epp: 7, name: 'CHALECOS REFLECTANTES', id_category: 4 },
  { id_epp: 8, name: 'CHALECOS ANTI-BALAS', id_category: 4 },
  { id_epp: 9, name: 'BOTAS DE SEGURIDAD', id_category: 5 },
  { id_epp: 10, name: 'BOTAS IMPERMEABLES', id_category: 5 },
  { id_epp: 11, name: 'AURICULARES PASIVOS', id_category: 6 },
  { id_epp: 12, name: 'AURICULARES ACTIVOS', id_category: 6 },
  { id_epp: 13, name: 'CASCOS DE SEGURIDAD', id_category: 7 },
  { id_epp: 14, name: 'CASCOS CON VISERA', id_category: 7 },
  { id_epp: 15, name: 'PROTECTORES DE CARA', id_category: 8 },
  { id_epp: 16, name: 'PROTECTORES RESPIRATORIOS', id_category: 9 },
  { id_epp: 17, name: 'OVEROL DE PROTECCION', id_category: 10 },
  { id_epp: 18, name: 'CAMISA DE TRABAJO', id_category: 10 }
];

export const dataTimeLife = [
  { id_time: 1, name: '1 Mes' },
  { id_time: 2, name: '2 Meses' },
  { id_time: 3, name: '3 Meses' },
  { id_time: 4, name: '4 Meses' },
  { id_time: 5, name: '5 Meses' },
  { id_time: 6, name: '6 Meses' },
  { id_time: 7, name: '7 Meses' },
  { id_time: 8, name: '8 Meses' },
  { id_time: 9, name: '9 Meses' },
  { id_time: 10, name: '10 Meses' }
];


export const dataRowsMatrizTable = [
  {
    id: 1,
    numero: '1',
    gerencia: 'Fábrica',
    area: 'Área 1',
    departamento: 'Departamento 1',
    puesto: 'Almacenero',
    epp: 'GUANTES LATEX',
    maxvida: '3 Meses',
    acciones: 'Reemplazo',
    id_appointment: 1,
    id_management: 1,
    id_area: 1,
    id_department: 1,
    id_category: 1,
    id_time: 3,
    id_epp: 1
  },
  {
    id: 2,
    numero: '2',
    gerencia: 'Fábrica',
    area: 'Área 2',
    departamento: 'Departamento 3',
    puesto: 'Operario',
    epp: 'MASCARILLAS KN95',
    maxvida: '2 Meses',
    acciones: 'Revisión',
    id_appointment: 2,
    id_management: 1,
    id_area: 2,
    id_department: 3,
    id_category: 2,
    id_time: 2,
    id_epp: 3
  },
  {
    id: 3,
    numero: '3',
    gerencia: 'Administrativa',
    area: 'Área 3',
    departamento: 'Departamento 5',
    puesto: 'Técnico',
    epp: 'GAFAS ANTIVAHO',
    maxvida: '4 Meses',
    acciones: 'Reemplazo',
    id_appointment: 3,
    id_management: 2,
    id_area: 3,
    id_department: 5,
    id_category: 3,
    id_time: 4,
    id_epp: 6
  },
  {
    id: 4,
    numero: '4',
    gerencia: 'Administrativa',
    area: 'Área 4',
    departamento: 'Departamento 7',
    puesto: 'Supervisor',
    epp: 'CHALECOS ANTI-BALAS',
    maxvida: '6 Meses',
    acciones: 'Revisión',
    id_appointment: 4,
    id_management: 2,
    id_area: 4,
    id_department: 7,
    id_category: 4,
    id_time: 6,
    id_epp: 8
  },
  {
    id: 5,
    numero: '5',
    gerencia: 'Campo',
    area: 'Área 5',
    departamento: 'Departamento 6',
    puesto: 'Ingeniero',
    epp: 'BOTAS DE SEGURIDAD',
    maxvida: '5 Meses',
    acciones: 'Reemplazo',
    id_appointment: 5,
    id_management: 3,
    id_area: 5,
    id_department: 6,
    id_category: 5,
    id_time: 5,
    id_epp: 9
  },
  {
    id: 6,
    numero: '6',
    gerencia: 'Campo',
    area: 'Área 6',
    departamento: 'Departamento 8',
    puesto: 'Coordinador',
    epp: 'AURICULARES ACTIVOS',
    maxvida: '7 Meses',
    acciones: 'Revisión',
    id_appointment: 6,
    id_management: 3,
    id_area: 6,
    id_department: 8,
    id_category: 6,
    id_time: 7,
    id_epp: 12
  },
  {
    id: 7,
    numero: '7',
    gerencia: 'RRHH',
    area: 'Área 7',
    departamento: 'Departamento 1',
    puesto: 'Jefe de Almacén',
    epp: 'CASCOS CON VISERA',
    maxvida: '9 Meses',
    acciones: 'Reemplazo',
    id_appointment: 7,
    id_management: 4,
    id_area: 7,
    id_department: 1,
    id_category: 7,
    id_time: 9,
    id_epp: 14
  },
  {
    id: 8,
    numero: '8',
    gerencia: 'RRHH',
    area: 'Área 8',
    departamento: 'Departamento 4',
    puesto: 'Asistente',
    epp: 'PROTECTORES DE CARA',
    maxvida: '10 Meses',
    acciones: 'Revisión',
    id_appointment: 8,
    id_management: 4,
    id_area: 8,
    id_department: 4,
    id_category: 8,
    id_time: 10,
    id_epp: 15
  },
];


// --- Para la tabla de los requerimientos 

export const registrosRequerimiento = [
  {
    id: 1,
    numero: "1",
    id_code: 1,
    id_user: 1,
    codigo: "REQ-001",
    dni: "70123645",
    colaborador: "Marcos Castillo",
    fecha: "13-02-2024",
    comentario: "-",
    tipo: "Normal",
  },
  {
    id: 2,
    numero: "2",
    id_code: 2,
    id_user: 2,
    codigo: "REQ-002",
    dni: "42135678",
    colaborador: "Jorge De la Cruz",
    fecha: "11-01-2023",
    comentario: "Se solicita gafas de impacto por peligro de daños en el área de trabajo.",
    tipo: "Emergencia"
  },
  {
    id: 3,
    numero: "3",
    id_code: 3,
    id_user: 3,
    codigo: "REQ-003",
    dni: "43265817",
    colaborador: "Diego Campos",
    fecha: "10-12-2023",
    comentario: "-",
    tipo: "Normal"
  },
  {
    id: 4,
    numero: "4",
    id_code: 4,
    id_user: 4,
    codigo: "REQ-004",
    dni: "75462318",
    colaborador: "Juan Solorzano",
    fecha: "09-11-2023",
    comentario: "-",
    tipo: "Normal"
  },
  {
    id: 5,
    numero: "5",
    id_code: 5,
    id_user: 5,
    codigo: "REQ-005",
    dni: "65478932",
    colaborador: "Ana Martínez",
    fecha: "15-03-2024",
    comentario: "Solicitud de botas de seguridad",
    tipo: "Normal"
  },
  {
    id: 6,
    numero: "6",
    id_code: 6,
    id_user: 6,
    codigo: "REQ-006",
    dni: "78965412",
    colaborador: "Luis Gómez",
    fecha: "22-04-2024",
    comentario: "-",
    tipo: "Normal"
  },
  {
    id: 7,
    numero: "7",
    id_code: 7,
    id_user: 7,
    codigo: "REQ-007",
    dni: "14725836",
    colaborador: "Carmen Rodríguez",
    fecha: "30-05-2024",
    comentario: "Reposición de casco dañado",
    tipo: "Emergencia"
  },
  {
    id: 8,
    numero: "8",
    id_code: 8,
    id_user: 8,
    codigo: "REQ-008",
    dni: "96325874",
    colaborador: "Pedro Sánchez",
    fecha: "07-06-2024",
    comentario: "-",
    tipo: "Normal"
  },
  {
    id: 9,
    numero: "9",
    id_code: 9,
    id_user: 9,
    codigo: "REQ-009",
    dni: "75315984",
    colaborador: "María López",
    fecha: "14-07-2024",
    comentario: "Solicitud de guantes de protección química",
    tipo: "Emergencia"
  },
  {
    id: 10,
    numero: "10",
    id_code: 10,
    id_user: 10,
    codigo: "REQ-010",
    dni: "45698712",
    colaborador: "Roberto Fernández",
    fecha: "21-08-2024",
    comentario: "-",
    tipo: "Normal"
  },
  {
    id: 11,
    numero: "11",
    id_code: 11,
    id_user: 11,
    codigo: "REQ-011",
    dni: "78945612",
    colaborador: "Laura Torres",
    fecha: "28-09-2024",
    comentario: "Reemplazo de chaleco reflectante",
    tipo: "Normal"
  },
  {
    id: 12,
    numero: "12",
    id_code: 12,
    id_user: 12,
    codigo: "REQ-012",
    dni: "32165498",
    colaborador: "Carlos Núñez",
    fecha: "05-10-2024",
    comentario: "-",
    tipo: "Normal"
  },
  {
    id: 13,
    numero: "13",
    id_code: 13,
    id_user: 13,
    codigo: "REQ-013",
    dni: "95175385",
    colaborador: "Patricia Ruiz",
    fecha: "12-11-2024",
    comentario: "Solicitud urgente de máscara respiratoria",
    tipo: "Emergencia"
  },
  {
    id: 14,
    numero: "14",
    id_code: 14,
    id_user: 14,
    codigo: "REQ-014",
    dni: "75395145",
    colaborador: "Miguel Ángel Pérez",
    fecha: "19-12-2024",
    comentario: "-",
    tipo: "Normal"
  },
  {
    id: 15,
    numero: "15",
    id_code: 15,
    id_user: 15,
    codigo: "REQ-015",
    dni: "45612378",
    colaborador: "Isabel García",
    fecha: "26-01-2025",
    comentario: "Renovación de equipo de protección personal",
    tipo: "Normal"
  }
];


export const registrosRequerimientoEpp = [
  { id: 1, numero: "1", id_code: 1, codigo: "C-015", epp: "GUANTES LATEX" },
  { id: 2, numero: "2", id_code: 2, codigo: "C-023", epp: "MASCARILLA KN95" },
  { id: 3, numero: "3", id_code: 3, codigo: "C-041", epp: "GUANTES DE TELA" },
  { id: 4, numero: "4", id_code: 4, codigo: "C-001", epp: "GAFAS DE SEGURIDAD" },
  { id: 5, numero: "5", id_code: 5, codigo: "C-015", epp: "GUANTES LATEX" },
  { id: 6, numero: "6", id_code: 6, codigo: "C-023", epp: "MASCARILLA KN95" },
  { id: 7, numero: "7", id_code: 7, codigo: "C-041", epp: "GUANTES DE TELA" },
  { id: 8, numero: "8", id_code: 8, codigo: "C-001", epp: "GAFAS DE SEGURIDAD" },
  { id: 9, numero: "9", id_code: 9, codigo: "C-015", epp: "GUANTES LATEX" },
  { id: 10, numero: "10", id_code: 10, codigo: "C-023", epp: "MASCARILLA KN95" },
  { id: 11, numero: "11", id_code: 11, codigo: "C-050", epp: "CASCO DE SEGURIDAD" },
  { id: 12, numero: "12", id_code: 12, codigo: "C-060", epp: "BOTAS DE SEGURIDAD" },
  { id: 13, numero: "13", id_code: 13, codigo: "C-070", epp: "PROTECTOR AUDITIVO" },
  { id: 14, numero: "14", id_code: 14, codigo: "C-080", epp: "CHALECO REFLECTANTE" },
  { id: 15, numero: "15", id_code: 15, codigo: "C-090", epp: "ARNÉS DE SEGURIDAD" },
  { id: 16, numero: "16", id_code: 3, codigo: "C-041", epp: "GUANTES DE TELA" },
  { id: 17, numero: "17", id_code: 4, codigo: "C-050", epp: "GAFAS DE POLISTILENO" },
  { id: 18, numero: "18", id_code: 7, codigo: "C-041", epp: "GUANTES DE TELA" },
  { id: 20, numero: "20", id_code: 13, codigo: "C-070", epp: "PROTECTOR AUDITIVO" }
];

const generateRandomNumber = (min: number, max: number): number =>  {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const ramdomReq = generateRandomNumber(1,100);

export const reqeCostosArray = [
  { id_costos: 1, name: "Centro Costos 1", id_padre: 1 },
  { id_costos: 2, name: "Centro Costos 2", id_padre: 1 },
  { id_costos: 3, name: "Centro Costos 3", id_padre: 1 },
  { id_costos: 4, name: "Centro Costos 4", id_padre: 2 },
  { id_costos: 5, name: "Centro Costos 5", id_padre: 2 },
  { id_costos: 6, name: "Centro Costos 6", id_padre: 3 },
  { id_costos: 7, name: "Centro Costos 7", id_padre: 3 },
  { id_costos: 8, name: "Centro Costos 8", id_padre: 4 },
  { id_costos: 9, name: "Centro Costos 9", id_padre: 5 },
  { id_costos: 10, name: "Centro Costos 10", id_padre: 6 },
];
export const dataGeografico = [
  { id_geographic_center: 1, name: "Centro Geográfico 1", id_padre: 1 },
  { id_geographic_center: 2, name: "Centro Geográfico 2", id_padre: 1 },
  { id_geographic_center: 3, name: "Centro Geográfico 3", id_padre: 1 },
  { id_geographic_center: 4, name: "Centro Geográfico 4", id_padre: 1 },
  { id_geographic_center: 5, name: "Centro Geográfico 5", id_padre: 1 },
  { id_geographic_center: 6, name: "Centro Geográfico 6", id_padre: 2 },
  { id_geographic_center: 7, name: "Centro Geográfico 7", id_padre: 2 },
  { id_geographic_center: 8, name: "Centro Geográfico 8", id_padre: 2 },
  { id_geographic_center: 9, name: "Centro Geográfico 9", id_padre: 2 },
  { id_geographic_center: 10, name: "Centro Geográfico 10", id_padre: 2 },
];

export const dataEmployee = [
  { id_employee: 1, documento: "70330448", name: "Jorge Bryhan Benites Vera", puesto: "Almacenero", gerencia: "Fábrica", departamento: "Fábrica", area: "Logística" },
  { id_employee: 2, documento: "12345678", name: "María López García", puesto: "Ingeniera", gerencia: "Desarrollo", departamento: "Ingeniería", area: "Desarrollo de Software" },
  { id_employee: 3, documento: "87654321", name: "Carlos Pérez Jiménez", puesto: "Contador", gerencia: "Finanzas", departamento: "Contabilidad", area: "Cuentas por Pagar" },
  { id_employee: 4, documento: "23456789", name: "Ana María Rodríguez", puesto: "Diseñadora", gerencia: "Marketing", departamento: "Creativo", area: "Diseño Gráfico" },
  { id_employee: 5, documento: "34567890", name: "Luis Fernando Torres", puesto: "Jefe de Ventas", gerencia: "Comercial", departamento: "Ventas", area: "Estrategia Comercial" },
  { id_employee: 6, documento: "45678901", name: "Patricia Esteban", puesto: "Asistente Administrativo", gerencia: "Recursos Humanos", departamento: "Administración", area: "Gestión de Personal" }
];

export const dataReqEpp = [
  { id_epp: 1, name: 'GUANTES LATEX', id_padre: 1 },
  { id_epp: 2, name: 'GUANTES NITRILO', id_padre: 1 },
  { id_epp: 3, name: 'MASCARILLAS KN95', id_padre: 2 },
  { id_epp: 4, name: 'MASCARILLAS QUIRURGICAS', id_padre: 2 },
  { id_epp: 5, name: 'GAFAS DE PROTECCION', id_padre: 3 },
  { id_epp: 6, name: 'GAFAS ANTIVAHO', id_padre: 3 },
  { id_epp: 7, name: 'CHALECOS REFLECTANTES', id_padre: 4 },
  { id_epp: 8, name: 'CHALECOS ANTI-BALAS', id_padre: 4 },
  { id_epp: 9, name: 'BOTAS DE SEGURIDAD', id_padre: 5 },
  { id_epp: 10, name: 'BOTAS IMPERMEABLES', id_padre: 5 },
  { id_epp: 11, name: 'AURICULARES PASIVOS', id_padre: 6 },
  { id_epp: 12, name: 'AURICULARES ACTIVOS', id_padre: 6 },
  { id_epp: 13, name: 'CASCOS DE SEGURIDAD', id_padre: 7 },
  { id_epp: 14, name: 'CASCOS CON VISERA', id_padre: 7 },
  { id_epp: 15, name: 'PROTECTORES DE CARA', id_padre: 8 },
  { id_epp: 16, name: 'PROTECTORES RESPIRATORIOS', id_padre: 9 },
  { id_epp: 17, name: 'OVEROL DE PROTECCION', id_padre: 10 },
  { id_epp: 18, name: 'CAMISA DE TRABAJO', id_padre: 10 }
];

export const dataReqAlmacen = [
  { id_store: 1, name: "Almacén A", id_padre: 1 }, 
  { id_store: 3, name: "Almacén B", id_padre: 2 }, 
  { id_store: 5, name: "Almacén C", id_padre: 3 }, 
  { id_store: 6, name: "Almacén D", id_padre: 4 },  
  { id_store: 8, name: "Almacén E", id_padre: 5 }, 
];

export const dataGerenciaRepo = [
  { "id_management": 1, "name": "Gerencia 1", "id_padre": 1 },
  { "id_management": 2, "name": "Gerencia 2", "id_padre": 1 },
  { "id_management": 3, "name": "Gerencia 3", "id_padre": 1 },
  { "id_management": 4, "name": "Gerencia 4", "id_padre": 2 },
  { "id_management": 5, "name": "Gerencia 5", "id_padre": 2 },
  { "id_management": 6, "name": "Gerencia 6", "id_padre": 3 },
  { "id_management": 7, "name": "Gerencia 7", "id_padre": 3 },
  { "id_management": 8, "name": "Gerencia 8", "id_padre": 4 },
  { "id_management": 9, "name": "Gerencia 9", "id_padre": 5 },
  { "id_management": 10, "name": "Gerencia 10", "id_padre": 6 },
  { "id_management": 11, "name": "Gerencia 11", "id_padre": 7 },
  { "id_management": 12, "name": "Gerencia 12", "id_padre": 8 }
]

export const dataEstadoRepo = [
  { "id_state": 1, "name": "Vencido", "id_padre": 1 },
  { "id_state": 2, "name": "Por vencer", "id_padre": 2 }
]

export const dataEstadisticas = [
  { masUtilizado1:'Gafas de seguridad ', nromasUtilizados1:'34',masUtilizado2:'Guantes de goma ', nromasUtilizados2:'23',
    masconsumidor1:'Jose Solorzano ', nromasconsumidor1:'2',masconsumidor2:'Manuel Campos  ', nromasconsumidor2:'3'
   }
];

export const dataTableReporte = [
  {
    "id": 1,
    "numero": 1,
    "fecha": "12/02/2024",
    "epp": "Gafas de seguridad",
    "unidad": "UNIDAD",
    "estadocambio": "Por vencer (2 días)",
    "cantidad": 1,
    "dni": "70875231",
    "nombre": "Jose Solorzano",
    "gerencia": "Fábrica",
    "puesto": "Almacenero",
    "estado": "Activo",
    "isVencido": 0,
    "isInactivo": 0
  },
  {
    "id": 2,
    "numero": 2,
    "fecha": "11/12/2023",
    "epp": "Pantallas faciales",
    "unidad": "PAR",
    "estadocambio": "Vencido (2 días)",
    "cantidad": 2,
    "dni": "42536189",
    "nombre": "Manuel Campos",
    "gerencia": "Fábrica",
    "puesto": "Almacenero",
    "estado": "Inactivo",
    "isVencido": 1,
    "isInactivo": 1
  },
  {
    "id": 3,
    "numero": 3,
    "fecha": "10/02/2024",
    "epp": "Guantes de goma",
    "unidad": "PAR",
    "estadocambio": "Por vencer (2 días)",
    "cantidad": 3,
    "dni": "32654819",
    "nombre": "Erick Rodriguez",
    "gerencia": "Fábrica",
    "puesto": "Almacenero",
    "estado": "Activo",
    "isVencido": 0,
    "isInactivo": 0
  },
  {
    "id": 4,
    "numero": 4,
    "fecha": "05/12/2023",
    "epp": "Guantes de tela",
    "unidad": "PAR",
    "estadocambio": "Por vencer (2 días)",
    "cantidad": 2,
    "dni": "45162378",
    "nombre": "Elmer Zavaleta",
    "gerencia": "Campo",
    "puesto": "Almacenero",
    "estado": "Activo",
    "isVencido": 0,
    "isInactivo": 0
  },
  {
    "id": 5,
    "numero": 5,
    "fecha": "14/02/2024",
    "epp": "Delantales",
    "unidad": "UNIDAD",
    "estadocambio": "Vencido (2 días)",
    "cantidad": 5,
    "dni": "51236498",
    "nombre": "Dennis Reyes",
    "gerencia": "RRHH",
    "puesto": "Almacenero",
    "estado": "Activo",
    "isVencido": 1,
    "isInactivo": 0
  },
  {
    "id": 6,
    "numero": 6,
    "fecha": "24/12/2023",
    "epp": "Botas quirúrgicas",
    "unidad": "PAR",
    "estadocambio": "Por vencer (2 días)",
    "cantidad": 3,
    "dni": "51132648",
    "nombre": "Dyland Ramires",
    "gerencia": "Campo",
    "puesto": "Almacenero",
    "estado": "Activo",
    "isVencido": 0,
    "isInactivo": 0
  },
  {
    "id": 7,
    "numero": 7,
    "fecha": "31/02/2024",
    "epp": "Botas quirúrgicas",
    "unidad": "PAR",
    "estadocambio": "Por vencer (2 días)",
    "cantidad": 2,
    "dni": "64512346",
    "nombre": "Coro García",
    "gerencia": "RRHH",
    "puesto": "Almacenero",
    "estado": "Activo",
    "isVencido": 0,
    "isInactivo": 0
  },
  {
    "id": 8,
    "numero": 8,
    "fecha": "22/12/2023",
    "epp": "Gafas de seguridad",
    "unidad": "UNIDAD",
    "estadocambio": "Por vencer (2 días)",
    "cantidad": 2,
    "dni": "45213645",
    "nombre": "Esteban Chacón",
    "gerencia": "Fábrica",
    "puesto": "Almacenero",
    "estado": "Inactivo",
    "isVencido": 0,
    "isInactivo": 1
  },
  {
    "id": 9,
    "numero": 9,
    "fecha": "18/03/2024",
    "epp": "Mascarillas N95",
    "unidad": "UNIDAD",
    "estadocambio": "Por vencer (5 días)",
    "cantidad": 10,
    "dni": "78945612",
    "nombre": "Laura Mendoza",
    "gerencia": "Laboratorio",
    "puesto": "Técnico",
    "estado": "Activo",
    "isVencido": 0,
    "isInactivo": 0
  },
  {
    "id": 10,
    "numero": 10,
    "fecha": "02/04/2024",
    "epp": "Cascos de seguridad",
    "unidad": "UNIDAD",
    "estadocambio": "Por vencer (10 días)",
    "cantidad": 4,
    "dni": "65478932",
    "nombre": "Carlos Paredes",
    "gerencia": "Construcción",
    "puesto": "Supervisor",
    "estado": "Activo",
    "isVencido": 0,
    "isInactivo": 0
  },
  {
    "id": 11,
    "numero": 11,
    "fecha": "15/01/2024",
    "epp": "Protectores auditivos",
    "unidad": "PAR",
    "estadocambio": "Vencido (5 días)",
    "cantidad": 6,
    "dni": "32165498",
    "nombre": "María Sánchez",
    "gerencia": "Fábrica",
    "puesto": "Operario",
    "estado": "Activo",
    "isVencido": 1,
    "isInactivo": 0
  },
  {
    "id": 12,
    "numero": 12,
    "fecha": "20/04/2024",
    "epp": "Arnés de seguridad",
    "unidad": "UNIDAD",
    "estadocambio": "Por vencer (15 días)",
    "cantidad": 2,
    "dni": "95175345",
    "nombre": "Jorge Mamani",
    "gerencia": "Mantenimiento",
    "puesto": "Técnico",
    "estado": "Activo",
    "isVencido": 0,
    "isInactivo": 0
  },
  {
    "id": 13,
    "numero": 13,
    "fecha": "08/03/2024",
    "epp": "Respiradores",
    "unidad": "UNIDAD",
    "estadocambio": "Vencido (1 día)",
    "cantidad": 3,
    "dni": "75395145",
    "nombre": "Ana Quispe",
    "gerencia": "Laboratorio",
    "puesto": "Investigador",
    "estado": "Activo",
    "isVencido": 1,
    "isInactivo": 0
  },
  {
    "id": 14,
    "numero": 14,
    "fecha": "30/04/2024",
    "epp": "Guantes de soldadura",
    "unidad": "PAR",
    "estadocambio": "Por vencer (20 días)",
    "cantidad": 2,
    "dni": "45678912",
    "nombre": "Pedro Huamán",
    "gerencia": "Fábrica",
    "puesto": "Soldador",
    "estado": "Activo",
    "isVencido": 0,
    "isInactivo": 0
  },
  {
    "id": 15,
    "numero": 15,
    "fecha": "25/02/2024",
    "epp": "Zapatos de seguridad",
    "unidad": "PAR",
    "estadocambio": "Por vencer (3 días)",
    "cantidad": 1,
    "dni": "85236974",
    "nombre": "Luisa Cortez",
    "gerencia": "Logística",
    "puesto": "Coordinador",
    "estado": "Activo",
    "isVencido": 0,
    "isInactivo": 0
  }
];

// --- data para la parte de gesion base 
export const empleadosData = [
  {
    id: 1,
    numero: 1,
    codigo: "LRDO-001",
    dni: "12345678",
    nombresyapellidos: "Reyes Rodriguez Erick",
    gerencia: "Geren 1",
    area: "Area 1",
    departamento: "Departamento 1",
    puesto: "Puest 1",
    perfil: "Perfil 1",
    estadoenempresa: "Activo",
    estadodeusuario: "Activo",
    centrodecosto: "Centro A"
  },
  {
    id: 2,
    numero: 2,
    codigo: "LRDO-002",
    dni: "12345678",
    nombresyapellidos: "Reyes Reyes José",
    gerencia: "Geren 2",
    area: "Area 2",
    departamento: "Departamento 2",
    puesto: "Pues 2",
    perfil: "Perfil 2",
    estadoenempresa: "Cesado",
    estadodeusuario: "Inactivo",
    centrodecosto: "Centro B"
  },
  {
    id: 3,
    numero: 3,
    codigo: "LRDO-001",
    dni: "12345678",
    nombresyapellidos: "Reyes Paredes Mark",
    gerencia: "Geren 3",
    area: "Area 3",
    departamento: "Departamento 3",
    puesto: "Pues 3",
    perfil: "Perfil 3",
    estadoenempresa: "Activo",
    estadodeusuario: "Activo",
    centrodecosto: "Centro C"
  },
  {
    id: 4,
    numero: 4,
    codigo: "LRDO-003",
    dni: "12345678",
    nombresyapellidos: "Paredes Cruz Brisa",
    gerencia: "Geren 4",
    area: "Area 4",
    departamento: "Departamento 4",
    puesto: "Pues 4",
    perfil: "Perfil 4",
    estadoenempresa: "Activo",
    estadodeusuario: "Activo",
    centrodecosto: "Centro D"
  },
  {
    id: 5,
    numero: 5,
    codigo: "LRDO-004",
    dni: "12345678",
    nombresyapellidos: "Reyes Ramos Diana",
    gerencia: "Geren 5",
    area: "Area 5",
    departamento: "Departamento 5",
    puesto: "Pues 5",
    perfil: "Perfil 5",
    estadoenempresa: "Activo",
    estadodeusuario: "Activo",
    centrodecosto: "Centro E"
  },
  {
    id: 6,
    numero: 6,
    codigo: "LRDO-005",
    dni: "12345678",
    nombresyapellidos: "Ramos Ramos Erick",
    gerencia: "Geren 6",
    area: "Area 6",
    departamento: "Departamento 6",
    puesto: "Pues 6",
    perfil: "Perfil 6",
    estadoenempresa: "Activo",
    estadodeusuario: "Activo",
    centrodecosto: "Centro F"
  },
  {
    id: 7,
    numero: 7,
    codigo: "LRDO-006",
    dni: "12345678",
    nombresyapellidos: "De la Cruz Jorge",
    gerencia: "Geren 7",
    area: "Area 7",
    departamento: "Departamento 7",
    puesto: "Pues 7",
    perfil: "Perfil 7",
    estadoenempresa: "Cesado",
    estadodeusuario: "Inactivo",
    centrodecosto: "Centro G"
  },
  {
    id: 8,
    numero: 8,
    codigo: "LRDO-007",
    dni: "12345678",
    nombresyapellidos: "Castillo Castillo Luz",
    gerencia: "Geren 8",
    area: "Area 8",
    departamento: "Departamento 8",
    puesto: "Pues 8",
    perfil: "Perfil 8",
    estadoenempresa: "Activo",
    estadodeusuario: "Activo",
    centrodecosto: "Centro H"
  },
  {
    id: 9,
    numero: 9,
    codigo: "LRDO-008",
    dni: "12345678",
    nombresyapellidos: "Mendoza López Ana",
    gerencia: "Geren 9",
    area: "Area 9",
    departamento: "Departamento 9",
    puesto: "Pues 9",
    perfil: "Perfil 9",
    estadoenempresa: "Activo",
    estadodeusuario: "Activo",
    centrodecosto: "Centro I"
  },
  {
    id: 10,
    numero: 10,
    codigo: "LRDO-009",
    dni: "12345678",
    nombresyapellidos: "García Torres Carlos",
    gerencia: "Geren 10",
    area: "Area 10",
    departamento: "Departamento 10",
    puesto: "Pues 10",
    perfil: "Perfil 10",
    estadoenempresa: "Activo",
    estadodeusuario: "Activo",
    centrodecosto: "Centro J"
  },
  {
    id: 11,
    numero: 11,
    codigo: "LRDO-010",
    dni: "12345678",
    nombresyapellidos: "Flores Vargas María",
    gerencia: "Geren 11",
    area: "Area 11",
    departamento: "Departamento 11",
    puesto: "Pues 11",
    perfil: "Perfil 11",
    estadoenempresa: "Activo",
    estadodeusuario: "Activo",
    centrodecosto: "Centro K"
  },
  {
    id: 12,
    numero: 12,
    codigo: "LRDO-011",
    dni: "12345678",
    nombresyapellidos: "Rojas Díaz Pedro",
    gerencia: "Geren 12",
    area: "Area 12",
    departamento: "Departamento 12",
    puesto: "Pues 12",
    perfil: "Perfil 12",
    estadoenempresa: "Cesado",
    estadodeusuario: "Inactivo",
    centrodecosto: "Centro L"
  },
  {
    id: 13,
    numero: 13,
    codigo: "LRDO-012",
    dni: "12345678",
    nombresyapellidos: "Gutiérrez Sánchez Laura",
    gerencia: "Geren 13",
    area: "Area 13",
    departamento: "Departamento 13",
    puesto: "Pues 13",
    perfil: "Perfil 13",
    estadoenempresa: "Activo",
    estadodeusuario: "Activo",
    centrodecosto: "Centro M"
  },
  {
    id: 14,
    numero: 14,
    codigo: "LRDO-013",
    dni: "12345678",
    nombresyapellidos: "Morales Castro Juan",
    gerencia: "Geren 14",
    area: "Area 14",
    departamento: "Departamento 14",
    puesto: "Pues 14",
    perfil: "Perfil 14",
    estadoenempresa: "Activo",
    estadodeusuario: "Activo",
    centrodecosto: "Centro N"
  },
  {
    id: 15,
    numero: 15,
    codigo: "LRDO-014",
    dni: "12345678",
    nombresyapellidos: "Ortega Ríos Isabel",
    gerencia: "Geren 15",
    area: "Area 15",
    departamento: "Departamento 15",
    puesto: "Pues 15",
    perfil: "Perfil 15",
    estadoenempresa: "Activo",
    estadodeusuario: "Activo",
    centrodecosto: "Centro O"
  },
  {
    id: 16,
    numero: 16,
    codigo: "LRDO-015",
    dni: "12345678",
    nombresyapellidos: "Vega Herrera Ricardo",
    gerencia: "Geren 16",
    area: "Area 16",
    departamento: "Departamento 16",
    puesto: "Pues 16",
    perfil: "Perfil 16",
    estadoenempresa: "Activo",
    estadodeusuario: "Activo",
    centrodecosto: "Centro P"
  },
  {
    id: 17,
    numero: 17,
    codigo: "LRDO-016",
    dni: "12345678",
    nombresyapellidos: "Navarro Campos Elena",
    gerencia: "Geren 17",
    area: "Area 17",
    departamento: "Departamento 17",
    puesto: "Pues 17",
    perfil: "Perfil 17",
    estadoenempresa: "Cesado",
    estadodeusuario: "Inactivo",
    centrodecosto: "Centro Q"
  },
  {
    id: 18,
    numero: 18,
    codigo: "LRDO-017",
    dni: "12345678",
    nombresyapellidos: "Medina Ruiz Gabriel",
    gerencia: "Geren 18",
    area: "Area 18",
    departamento: "Departamento 18",
    puesto: "Pues 18",
    perfil: "Perfil 18",
    estadoenempresa: "Activo",
    estadodeusuario: "Activo",
    centrodecosto: "Centro R"
  },
  {
    id: 19,
    numero: 19,
    codigo: "LRDO-018",
    dni: "12345678",
    nombresyapellidos: "Delgado Fuentes Sofía",
    gerencia: "Geren 19",
    area: "Area 19",
    departamento: "Departamento 19",
    puesto: "Pues 19",
    perfil: "Perfil 19",
    estadoenempresa: "Activo",
    estadodeusuario: "Activo",
    centrodecosto: "Centro S"
  },
  {
    id: 20,
    numero: 20,
    codigo: "LRDO-019",
    dni: "12345678",
    nombresyapellidos: "Cervantes Mora Hugo",
    gerencia: "Geren 20",
    area: "Area 20",
    departamento: "Departamento 20",
    puesto: "Pues 20",
    perfil: "Perfil 20",
    estadoenempresa: "Activo",
    estadodeusuario: "Activo",
    centrodecosto: "Centro T"
  }
];


// export const dataTableSolicitud = [
//   {
//     id: 1,
//     id_code: 1,
//     codigo: "REQ-001",
//     dni: "70123645",
//     fecha: "13-02-2024",
//     registro: "Marcos Castillo",
//     comentario: "-",
//     tipo: "Normal",
//     accion: "Aprobado",
//     numero: 1
//   },
//   {
//     id: 2,
//     id_code: 2,
//     codigo: "REQ-002",
//     dni: "65478932",
//     fecha: "14-02-2024",
//     registro: "Ana García",
//     comentario: "Pendiente de revisión",
//     tipo: "Urgente",
//     accion: "En proceso",
//     numero: 2
//   },
//   {
//     id: 3,
//     id_code: 3,
//     codigo: "REQ-003",
//     dni: "78965412",
//     fecha: "15-02-2024",
//     registro: "Luis Mendoza",
//     comentario: "Documentación incompleta",
//     tipo: "Normal",
//     accion: "Rechazado",
//     numero: 3
//   },
//   {
//     id: 4,
//     id_code: 4,
//     codigo: "REQ-004",
//     dni: "14725836",
//     fecha: "16-02-2024",
//     registro: "Carmen Rodríguez",
//     comentario: "-",
//     tipo: "Normal",
//     accion: "Aprobado",
//     numero: 4
//   },
//   {
//     id: 5,
//     id_code: 5,
//     codigo: "REQ-005",
//     dni: "96325874",
//     fecha: "17-02-2024",
//     registro: "Jorge Pérez",
//     comentario: "Requiere verificación adicional",
//     tipo: "Urgente",
//     accion: "En proceso",
//     numero: 5
//   },
//   {
//     id: 6,
//     id_code: 6,
//     codigo: "REQ-006",
//     dni: "75315948",
//     fecha: "18-02-2024",
//     registro: "María Sánchez",
//     comentario: "-",
//     tipo: "Normal",
//     accion: "Aprobado",
//     numero: 6
//   },
//   {
//     id: 7,
//     id_code: 7,
//     codigo: "REQ-007",
//     dni: "85236974",
//     fecha: "19-02-2024",
//     registro: "Pedro Gómez",
//     comentario: "Falta firma",
//     tipo: "Normal",
//     accion: "En proceso",
//     numero: 7
//   },
//   {
//     id: 8,
//     id_code: 8,
//     codigo: "REQ-008",
//     dni: "45678912",
//     fecha: "20-02-2024",
//     registro: "Laura Martínez",
//     comentario: "-",
//     tipo: "Urgente",
//     accion: "Aprobado",
//     numero: 8
//   },
//   {
//     id: 9,
//     id_code: 9,
//     codigo: "REQ-009",
//     dni: "36985214",
//     fecha: "21-02-2024",
//     registro: "Carlos Ruiz",
//     comentario: "Datos inconsistentes",
//     tipo: "Normal",
//     accion: "Rechazado",
//     numero: 9
//   },
//   {
//     id: 10,
//     id_code: 10,
//     codigo: "REQ-010",
//     dni: "25896314",
//     fecha: "22-02-2024",
//     registro: "Sofía Torres",
//     comentario: "-",
//     tipo: "Normal",
//     accion: "Aprobado",
//     numero: 10
//   },
//   {
//     id: 11,
//     id_code: 11,
//     codigo: "REQ-011",
//     dni: "74185296",
//     fecha: "23-02-2024",
//     registro: "Diego Herrera",
//     comentario: "Pendiente de documentación",
//     tipo: "Urgente",
//     accion: "En proceso",
//     numero: 11
//   },
//   {
//     id: 12,
//     id_code: 12,
//     codigo: "REQ-012",
//     dni: "95175385",
//     fecha: "24-02-2024",
//     registro: "Elena Castro",
//     comentario: "-",
//     tipo: "Normal",
//     accion: "Aprobado",
//     numero: 12
//   },
//   {
//     id: 13,
//     id_code: 13,
//     codigo: "REQ-013",
//     dni: "15935785",
//     fecha: "25-02-2024",
//     registro: "Javier Morales",
//     comentario: "Requiere revisión legal",
//     tipo: "Normal",
//     accion: "En proceso",
//     numero: 13
//   },
//   {
//     id: 14,
//     id_code: 14,
//     codigo: "REQ-014",
//     dni: "35795135",
//     fecha: "26-02-2024",
//     registro: "Isabel Vega",
//     comentario: "-",
//     tipo: "Urgente",
//     accion: "Aprobado",
//     numero: 14
//   },
//   {
//     id: 15,
//     id_code: 15,
//     codigo: "REQ-015",
//     dni: "45612378",
//     fecha: "27-02-2024",
//     registro: "Roberto Núñez",
//     comentario: "Documentación caducada",
//     tipo: "Normal",
//     accion: "Rechazado",
//     numero: 15
//   }
// ]

export const dataTableSolicitud = [
  {
    id: 1,
    id_code: 1,
    codigo: "REQ-001",
    codigoSAP: "SAP-001",
    dni: "70123645",
    fecha: "13-02-2024",
    registro: "Marcos Castillo",
    comentario: "-",
    tipo: "Normal",
    accion: "Aprobado",
    numero: 1
  },
  {
    id: 2,
    id_code: 2,
    codigo: "REQ-002",
    codigoSAP: "SAP-002",
    dni: "65478932",
    fecha: "14-02-2024",
    registro: "Ana García",
    comentario: "Pendiente de revisión",
    tipo: "Urgente",
    accion: "En proceso",
    numero: 2
  },
  {
    id: 3,
    id_code: 3,
    codigo: "REQ-003",
    codigoSAP: "SAP-003",
    dni: "78965412",
    fecha: "15-02-2024",
    registro: "Luis Mendoza",
    comentario: "Documentación incompleta",
    tipo: "Normal",
    accion: "Rechazado",
    numero: 3
  },
  {
    id: 4,
    id_code: 4,
    codigo: "REQ-004",
    codigoSAP: "SAP-004",
    dni: "14725836",
    fecha: "16-02-2024",
    registro: "Carmen Rodríguez",
    comentario: "-",
    tipo: "Normal",
    accion: "Aprobado",
    numero: 4
  },
  {
    id: 5,
    id_code: 5,
    codigo: "REQ-005",
    codigoSAP: "SAP-005",
    dni: "96325874",
    fecha: "17-02-2024",
    registro: "Jorge Pérez",
    comentario: "Requiere verificación adicional",
    tipo: "Urgente",
    accion: "En proceso",
    numero: 5
  },
  {
    id: 6,
    id_code: 6,
    codigo: "REQ-006",
    codigoSAP: "SAP-006",
    dni: "75315948",
    fecha: "18-02-2024",
    registro: "María Sánchez",
    comentario: "-",
    tipo: "Normal",
    accion: "Aprobado",
    numero: 6
  },
  {
    id: 7,
    id_code: 7,
    codigo: "REQ-007",
    codigoSAP: "SAP-007",
    dni: "85236974",
    fecha: "19-02-2024",
    registro: "Pedro Gómez",
    comentario: "Falta firma",
    tipo: "Normal",
    accion: "En proceso",
    numero: 7
  },
  {
    id: 8,
    id_code: 8,
    codigo: "REQ-008",
    codigoSAP: "SAP-008",
    dni: "45678912",
    fecha: "20-02-2024",
    registro: "Laura Martínez",
    comentario: "-",
    tipo: "Urgente",
    accion: "Aprobado",
    numero: 8
  },
  {
    id: 9,
    id_code: 9,
    codigo: "REQ-009",
    codigoSAP: "SAP-009",
    dni: "36985214",
    fecha: "21-02-2024",
    registro: "Carlos Ruiz",
    comentario: "Datos inconsistentes",
    tipo: "Normal",
    accion: "Rechazado",
    numero: 9
  },
  {
    id: 10,
    id_code: 10,
    codigo: "REQ-010",
    codigoSAP: "SAP-010",
    dni: "25896314",
    fecha: "22-02-2024",
    registro: "Sofía Torres",
    comentario: "-",
    tipo: "Normal",
    accion: "Aprobado",
    numero: 10
  },
  {
    id: 11,
    id_code: 11,
    codigo: "REQ-011",
    codigoSAP: "SAP-011",
    dni: "74185296",
    fecha: "23-02-2024",
    registro: "Diego Herrera",
    comentario: "Pendiente de documentación",
    tipo: "Urgente",
    accion: "En proceso",
    numero: 11
  },
  {
    id: 12,
    id_code: 12,
    codigo: "REQ-012",
    codigoSAP: "SAP-012",
    dni: "95175385",
    fecha: "24-02-2024",
    registro: "Elena Castro",
    comentario: "-",
    tipo: "Normal",
    accion: "Aprobado",
    numero: 12
  },
  {
    id: 13,
    id_code: 13,
    codigo: "REQ-013",
    codigoSAP: "SAP-013",
    dni: "15935785",
    fecha: "25-02-2024",
    registro: "Javier Morales",
    comentario: "Requiere revisión legal",
    tipo: "Normal",
    accion: "En proceso",
    numero: 13
  },
  {
    id: 14,
    id_code: 14,
    codigo: "REQ-014",
    codigoSAP: "SAP-014",
    dni: "35795135",
    fecha: "26-02-2024",
    registro: "Isabel Vega",
    comentario: "-",
    tipo: "Urgente",
    accion: "Aprobado",
    numero: 14
  },
  {
    id: 15,
    id_code: 15,
    codigo: "REQ-015",
    codigoSAP: "SAP-015",
    dni: "45612378",
    fecha: "27-02-2024",
    registro: "Roberto Núñez",
    comentario: "Documentación caducada",
    tipo: "Normal",
    accion: "Rechazado",
    numero: 15
  }
];



// registro de matriz