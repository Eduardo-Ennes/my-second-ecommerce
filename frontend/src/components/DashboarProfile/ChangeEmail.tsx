import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import iconInfo from '../../assets/info.png'
import {
  Alert,
  AlertTitle,
} from "@/components/ui/alert"
import { useState } from "react"

function ChangeEmail() {
    const [error, setError] = useState("")
  return (
    <>
        <div className="flex w-full max-w-sm flex-col gap-6 ml-auto mr-auto mt-10">
            <Tabs defaultValue="account">
                <TabsList className="bg-gray-500">
                <TabsTrigger value="account">Email</TabsTrigger>
                <TabsTrigger value="password">Token</TabsTrigger>
                </TabsList>
                <TabsContent value="account"> 
                <Card className="bg-zinc-900 border-gray-700 text-gray-200">
                    <CardHeader>
                    <CardTitle className="leading-normal">Digite nos campos abaixo para trocar o seu email de acesso</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-6 ">
                    <div className="grid gap-3">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                        type="email"
                        id="email" 
                        placeholder="Digite o seu novo email" />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="confirm_email">Confirme o seu email</Label>
                        <Input 
                        id="confirm_email" 
                        placeholder="Confirme o seu email" />
                    </div>
                    </CardContent>

                    {error.length > 0 && 
                        <CardContent className="grid gap-6 ">
                            <div className="w-full ml-auto mr-auto mt-5 mb-2">
                                <Alert variant="destructive" className="bg-red-600 text-gray-200 flex flex-wrap gap-x-3 border-none">
                                    <img src={iconInfo} alt="Icone de informação" />
                                    <AlertTitle>{error}</AlertTitle>
                                </Alert>
                            </div>
                        </CardContent>
                    }
                    
                    <CardFooter>
                    <Button 
                        type="button"
                        className="rounded cursor-pointer bg-zinc-700 hover:bg-zinc-800 px-4 py-2 text-base ml-auto text-gray-200">
                        Enviar
                    </Button>
                    </CardFooter>
                </Card>
                </TabsContent>

                <TabsContent value="password">
                <Card className="bg-zinc-900 border-gray-700 text-gray-200">
                    <CardHeader>
                    <CardTitle>Digite o token de verificação abaixo</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-6">
                    <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
                            <InputOTPGroup className="ml-auto mr-auto ">
                                <InputOTPSlot index={0} className="border-gray-600 w-[3rem]"/>
                                <InputOTPSlot index={1} className="border-gray-600 w-[3rem]"/>
                                <InputOTPSlot index={2} className="border-gray-600 w-[3rem]"/>
                                <InputOTPSlot index={3} className="border-gray-600 w-[3rem]"/>
                                <InputOTPSlot index={4} className="border-gray-600 w-[3rem]"/>
                                <InputOTPSlot index={5} className="border-gray-600 w-[3rem]"/>
                            </InputOTPGroup>
                        </InputOTP>
                    </CardContent>

                    {error.length > 0 && 
                        <CardContent className="grid gap-6 ">
                            <div className="w-full ml-auto mr-auto mt-5 mb-2">
                                <Alert variant="destructive" className="bg-red-600 text-gray-200 flex flex-wrap gap-x-3 border-none">
                                    <img src={iconInfo} alt="Icone de informação" />
                                    <AlertTitle>{error}</AlertTitle>
                                </Alert>
                            </div>
                        </CardContent>
                    }

                    <CardFooter>
                        <Button 
                        type="button"
                        className="rounded cursor-pointer bg-zinc-700 hover:bg-zinc-800 px-4 py-2 text-base ml-auto text-gray-200">
                        Enviar
                        </Button>
                    </CardFooter>
                </Card>
                </TabsContent>
            </Tabs>
        </div>
    </>
    
  )
}

export default ChangeEmail