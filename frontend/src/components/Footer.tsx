import { Link } from "react-router-dom";
import IconGithub from '../assets/github.png'
import IconLinkedin from '../assets/linkedin.png'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"
import { useState } from "react";

function Footer() {
  const [value, setValue] = useState<string | undefined>(undefined)
  return (
    <>
        <footer className="bg-[oklch(14.5%_0_0)] text-white p-4 border-t mt-[2rem] border-gray-700">
          <div>
            <div className="space-y-1">
              <h4 className="text-lg leading-none font-medium mb-6">Redes e contato</h4>
              {/* <p className=" text-sm">
                An open-source UI component library.
              </p> */}
            </div>
            {/* <Separator className="my-4" /> */}
            <div className="flex h-5 items-center space-x-4 text-sm">
              <div>
                <Link to='http://github.com/Eduardo-Ennes' target="_blank" rel="noopener noreferrer">
                  <img src={IconGithub} alt="Icone do github" />
                </Link>
              </div>
              <Separator orientation="vertical" />
              <div>
                <Link to='http://linkedin.com/in/eduardo-ennes-537070186' target="_blank" rel="noopener noreferrer">
                  <img src={IconLinkedin} alt="Icone do linkedin" />
                </Link>
              </div>
              <Separator orientation="vertical" />
              <div className="text-base font-medium">eduardosimoes9899@gmail.com</div>
            </div>
          </div>

          <Separator className="my-4" />

          <Accordion
            type="single" collapsible className="rounded w-full" value={value} onValueChange={setValue}
          >
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-base cursor-pointer">Sobre Mim</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                <p>
                  Estudando e me qualificando para me tornar desenvolvedor full-stack e também me aprofundando na área de DevOps. Cursando Análise e Desenvolvimento de Sistemas com o objetivo de em breve ingressar em Ciência da Computação.
                </p>
                <p>
                  Este site está sendo desenvolvido para fins de portifólio, nele mostrarei minhas competências e conhecimentos. 
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </footer>
    </>
  )
}

export default Footer