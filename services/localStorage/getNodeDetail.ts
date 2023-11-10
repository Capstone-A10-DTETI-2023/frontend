interface WithId {
    id: number
}

const getDataById = <T extends WithId>(id: string | string[], key: string): T => {
    const data = JSON.parse(localStorage.getItem(key)!) as Array<T>;

    const datum = data.find((datum) => {
        return datum.id.toString() === id;
    })!;

    return datum;
}

export default getDataById;