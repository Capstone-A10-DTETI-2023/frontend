const ALARM_TYPES: Array<{ id: number, name: string }> = [
    {
        id: 0,
        name: 'Tidak ada alarm',
    },
    {
        id: 1,
        name: 'Nilai sensor < ambang bawah',
    },
    {
        id: 2,
        name: 'Nilai sensor > ambang atas',
    },
    {
        id: 3,
        name: 'Di luar ambang bawah dan atas',
    },
];

export default ALARM_TYPES;