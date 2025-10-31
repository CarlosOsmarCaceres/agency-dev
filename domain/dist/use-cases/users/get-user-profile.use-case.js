export class GetUserProfileUseCase {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(input) {
        const user = await this.userRepository.findById(input.userId);
        if (!user) {
            throw new Error('User not found.');
        }
        // Creamos un nuevo objeto para asegurarnos de no devolver el hash por accidente
        const userProfile = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
        };
        return userProfile;
    }
}
//# sourceMappingURL=get-user-profile.use-case.js.map