lib/
actions.ts 用于管理表单
form-schemas.ts 定义并验证用户提交的表单数据
prisma.ts 创建和管理一个 Prisma Client 的实例, 通过单例模式（singleton pattern）来管理数据库连接

CLI
启动 Prisma Studio
`npx prisma studio`

查看数据库 schema（架构）
`npx prisma db pull`

对 schema.prisma 进行了更改，可以使用以下命令生成迁移文件:
`npx prisma migrate dev`
`npx prisma generate`

`npx prisma db push`

TODO page:
LoginPage (/sign-in): Shared by both employees and HR.
SignUpPage (/sign-up): For new employees.
EmployeeDashboard (/employee/dashboard): Employee-specific portal for viewing onboarding progress.
HRDashboard (/hr/dashboard): For HR to manage employees and onboarding.
ProfilePage (/employee/profile, /hr/employee/[id]): Shared for viewing and editing employee information.
DocumentsPage (/employee/documents, /hr/employee/[id]/documents): Shared document management.
OnboardingPage (/employee/onboarding, /hr/employee/[id]/onboarding): Shared onboarding progress view.
AdminPanel (/hr/admin): For HR to manage settings and permissions.

