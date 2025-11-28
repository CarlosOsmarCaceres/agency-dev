// --- 2. IMPORTAR IMPLEMENTACIONES (ADAPTADORES) DEL BACKEND ---
import { PrismaUserRepository } from './adapters/repositories/prisma-user.repository.js';
import { PrismaClientRepository } from './adapters/repositories/prisma-client.repository.js';
import { PrismaCategoryRepository } from './adapters/repositories/prisma-category.repository.js';
import { PrismaServiceRepository } from './adapters/repositories/prisma-service.repository.js';
import { PrismaMaintenancePlanRepository } from './adapters/repositories/prisma-maintenance-plan.repository.js';
import { PrismaCartRepository } from './adapters/repositories/prisma-cart.repository.js';
import { PrismaProjectRepository } from './adapters/repositories/prisma-project.repository.js';
import { PrismaInvoiceRepository } from './adapters/repositories/prisma-invoice.repository.js';
import { PrismaPaymentRepository } from './adapters/repositories/prisma-payment.repository.js';
import { BcryptEncrypterAdapter } from './adapters/providers/bcrypt-encrypter.provider.js';
import { JwtAuthenticatorAdapter } from './adapters/providers/jwt-authenticator.provider.js';
// --- 3. IMPORTAR TODOS LOS CASOS DE USO DEL DOMINIO ---
// Módulo de Usuarios
import { RegisterUserUseCase } from '../../../domain/dist/use-cases/users/register-user.use-case.js';
import { LoginUseCase } from '../../../domain/dist/use-cases/login.use-cases.js';
import { GetUserProfileUseCase } from '../../../domain/dist/use-cases/users/get-user-profile.use-case.js';
import { UpdateUserProfileUseCase } from '../../../domain/dist/use-cases/users/update-user-profile.use-case.js';
import { ListUsersUseCase } from '../../../domain/dist/use-cases/users/list-users.use-case.js';
import { GetUserByIdUseCase } from '../../../domain/dist/use-cases/users/get-user-by-id.use-case.js';
import { UpdateUserRoleUseCase } from '../../../domain/dist/use-cases/users/update-user-role.use-case.js';
import { DeleteUserUseCase } from '../../../domain/dist/use-cases/users/delete-user.use-case.js';
import { DeleteServiceUseCase } from '../../../domain/dist/use-cases/catalog/delete-service.use-case.js';
import { UpdateCategoryUseCase } from '../../../domain/dist/use-cases/catalog/update-category.use-case.js';
import { DeleteCategoryUseCase } from '../../../domain/dist/use-cases/catalog/delete-category.use-case.js';
// Módulo de Catálogo
import { CreateCategoryUseCase } from '../../../domain/dist/use-cases/catalog/create-category.use-case.js';
import { CreateServiceUseCase } from '../../../domain/dist/use-cases/catalog/create-service.use-case.js';
import { UpdateServiceUseCase } from '../../../domain/dist/use-cases/catalog/update-service.use-case.js';
import { ListCategoriesUseCase } from '../../../domain/dist/use-cases/catalog/list-categories.use-case.js';
import { ListServicesUseCase } from '../../../domain/dist/use-cases/catalog/list-services.use-case.js';
// Módulo de Negocio (Carrito, Proyectos)
import { AddToCartUseCase } from '../../../domain/dist/use-cases/business/add-to-cart.use-case.js';
import { ViewCartUseCase } from '../../../domain/dist/use-cases/business/view-cart.use-case.js';
import { RemoveFromCartUseCase } from '../../../domain/dist/use-cases/business/remove-from-cart.use-case.js';
import { CheckoutUseCase } from '../../../domain/dist/use-cases/business/checkout.use-case.js';
import { ListProjectsByClientUseCase } from '../../../domain/dist/use-cases/business/list-projects-by-client.use-case.js';
import { GetProjectDetailsUseCase } from '../../../domain/dist/use-cases/business/get-project-details.use-case.js';
import { AssignUserToProjectUseCase } from '../../../domain/dist/use-cases/business/assign-user-to-project.use-case.js';
import { UpdateProjectStatusUseCase } from '../../../domain/dist/use-cases/business/update-project-status.use-case.js';
// Módulo de Finanzas
import { ListInvoicesByClientUseCase } from '../../../domain/dist/use-cases/finance/list-invoices-by-client.use-case.js';
import { ProcessPaymentUseCase } from '../../../domain/dist/use-cases/finance/process-payment.use-case.js';
import { CreateManualInvoiceUseCase } from '../../../domain/dist/use-cases/finance/create-manual-invoice.use-case.js';
// --- 4. INSTANCIAR ADAPTADORES ---
// (Nota: Idealmente, PrismaClient sería un singleton, pero esto funciona)
const userRepository = new PrismaUserRepository();
const clientRepository = new PrismaClientRepository();
const categoryRepository = new PrismaCategoryRepository();
const serviceRepository = new PrismaServiceRepository();
const maintenancePlanRepository = new PrismaMaintenancePlanRepository();
const cartRepository = new PrismaCartRepository();
const projectRepository = new PrismaProjectRepository();
const invoiceRepository = new PrismaInvoiceRepository();
const paymentRepository = new PrismaPaymentRepository();
const encrypter = new BcryptEncrypterAdapter();
export const authenticator = new JwtAuthenticatorAdapter();
// --- 5. INSTANCIAR Y EXPORTAR CASOS DE USO ---
// (Aquí "conectamos" los adaptadores reales a los casos de uso)
// Usuarios
export const registerUserUseCase = new RegisterUserUseCase(userRepository, encrypter);
export const loginUseCase = new LoginUseCase(userRepository, encrypter, authenticator);
export const getUserProfileUseCase = new GetUserProfileUseCase(userRepository);
export const updateUserProfileUseCase = new UpdateUserProfileUseCase(userRepository, clientRepository);
export const listUsersUseCase = new ListUsersUseCase(userRepository);
export const getUserByIdUseCase = new GetUserByIdUseCase(userRepository);
export const updateUserRoleUseCase = new UpdateUserRoleUseCase(userRepository);
export const deleteUserUseCase = new DeleteUserUseCase(userRepository);
// Catálogo
export const createCategoryUseCase = new CreateCategoryUseCase(userRepository, categoryRepository);
export const createServiceUseCase = new CreateServiceUseCase(userRepository, categoryRepository, serviceRepository);
export const updateServiceUseCase = new UpdateServiceUseCase(userRepository, serviceRepository);
export const listCategoriesUseCase = new ListCategoriesUseCase(categoryRepository);
export const listServicesUseCase = new ListServicesUseCase(serviceRepository);
// Negocio (Carrito, Proyectos)
export const addToCartUseCase = new AddToCartUseCase(userRepository, clientRepository, serviceRepository, maintenancePlanRepository, cartRepository);
export const viewCartUseCase = new ViewCartUseCase(userRepository, clientRepository, cartRepository, serviceRepository, maintenancePlanRepository);
export const removeFromCartUseCase = new RemoveFromCartUseCase(userRepository, clientRepository, cartRepository);
export const checkoutUseCase = new CheckoutUseCase(userRepository, clientRepository, cartRepository, serviceRepository, projectRepository, invoiceRepository);
export const listProjectsByClientUseCase = new ListProjectsByClientUseCase(userRepository, clientRepository, projectRepository);
export const getProjectDetailsUseCase = new GetProjectDetailsUseCase(userRepository, clientRepository, projectRepository, serviceRepository);
export const assignUserToProjectUseCase = new AssignUserToProjectUseCase(userRepository, projectRepository);
export const updateProjectStatusUseCase = new UpdateProjectStatusUseCase(userRepository, projectRepository);
// Finanzas
export const listInvoicesByClientUseCase = new ListInvoicesByClientUseCase(userRepository, clientRepository, invoiceRepository);
export const processPaymentUseCase = new ProcessPaymentUseCase(invoiceRepository, paymentRepository);
export const createManualInvoiceUseCase = new CreateManualInvoiceUseCase(userRepository, projectRepository, invoiceRepository);
export const deleteServiceUseCase = new DeleteServiceUseCase(userRepository, serviceRepository);
export const updateCategoryUseCase = new UpdateCategoryUseCase(userRepository, categoryRepository);
export const deleteCategoryUseCase = new DeleteCategoryUseCase(userRepository, categoryRepository);
