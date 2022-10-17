import bcrypt from 'bcrypt';

const encryptPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

const compareWithEncrypted = (decrypted: string, encrypted: string) => {
    return bcrypt.compare(decrypted, encrypted);
}

export default { compareWithEncrypted, encryptPassword }