const parseObject = (data: any) => {
    return JSON.parse(JSON.stringify(data));
}

export { parseObject }