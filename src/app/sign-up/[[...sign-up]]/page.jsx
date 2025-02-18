import { SignUp } from '@clerk/nextjs'

const page = () => {
  return (
    <div className="w-screen h-screen flex flex-col gap-3 justify-center items-center bg-[url('/LoginImage/Login.png')] bg-cover bg-center">
      <h1 className="text-4xl font-bold bg-white shadow-xl p-3 rounded-[.5rem] bg-opacity-95 text-secondary-foreground">Shop<span className="text-primary">book</span></h1>
    <SignUp 
      appearance={{
        elements: {
          socialButtons: "flex",
          cardBox: "border shadow-none",
          rootBox: "border-none shadow-none",
          card: "bg-white bg-opacity-90",
          headerTitle: "hidden"
        },
      }}
    />
    </div>
  )
}

export default page