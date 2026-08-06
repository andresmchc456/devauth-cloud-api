import bcrypt from 'bcrypt';

// Cifra la contraseña plana antes de guardarla en la base de datos
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

// Compara una contraseña ingresada en el login con el hash de la BD
export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};
