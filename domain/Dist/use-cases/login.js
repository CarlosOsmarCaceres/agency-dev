export class LoginUseCase {
    userRepository;
    encrypter;
    authenticator;
    constructor(userRepository, encrypter, authenticator) {
        this.userRepository = userRepository;
        this.encrypter = encrypter;
        this.authenticator = authenticator;
    }
    async execute(input) {
        // 1. Buscar al usuario por su email
        const user = await this.userRepository.findByEmail(input.email);
        if (!user) {
            throw new Error('Invalid credentials.');
        }
        // 2. Comparar la contraseña proporcionada con el hash guardado
        const isPasswordValid = await this.encrypter.compare(input.password, user.passwordHash);
        if (!isPasswordValid) {
            throw new Error('Invalid credentials.');
        }
        // 3. Si todo es correcto, generar y devolver un token
        const token = await this.authenticator.generateToken({
            id: user.id,
            role: user.role,
        });
        return token;
    }
}
//# sourceMappingURL=login.js.map