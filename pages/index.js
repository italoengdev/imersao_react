import { Box, Button, Text, TextField, Image } from '@skynexui/components'
import appConfig from '../config.json'
import React from 'react'
import { useRouter } from 'next/router'

function Titulo(props) {
  const Tag = props.tag || 'h1'
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>{`
        ${Tag} {
          font-family: Roboto;
          font-style: normal;
          font-weight: bold;
          font-size: 24px;
          line-height: 28px;

          color: ${appConfig.theme.colors.neutrals['000']};
        }
      `}</style>
    </>
  )
}

//function HomePage() {
//  return (
//    <div>
//      <GlobalStyle />
//      <Titulo tag="h1">Boas vindas de volta!</Titulo>
//      <Titulo tag="h2">Aluracord - Alura Matrix</Titulo>
//    </div>
//  )
//}
//
//export default HomePage

export default function PaginaInicial() {
  const [username, setUsername] = React.useState('italoengdev')
  const roteamento = useRouter()
  const pageGit = `https://api.github.com/users/${username}`

  fetch(pageGit)
    .then(response => response.json())
    .then(data => {
      appConfig.name = data.name
    })
  let icon =
    username.length > 2
      ? `https://github.com/${username}.png`
      : `https://cdn.neemo.com.br/uploads/settings_webdelivery/logo/2496/not-found-image-15383864787lu.jpg`

  return (
    <>
      <Box
        styleSheet={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',

          backgroundImage: 'url(https://i.imgur.com/3r445nS.gif)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundBlendMode: 'multiply',
          backgroundPosition: 'center'
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row'
            },
            width: '100%',
            maxWidth: '700px',
            borderRadius: '5px',
            padding: '32px',
            margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: appConfig.theme.colors.neutrals[700]
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={function (infosDoEvento) {
              infosDoEvento.preventDefault()
              console.log('Alguém submeteu o form')
              roteamento.push(`/chat?username=${username}`)
              // window.location.href = '/chat';
            }}
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: { xs: '100%', sm: '50%' },
              textAlign: 'center',
              marginBottom: '32px'
            }}
          >
            <Titulo tag="h2">Bem vindo de volta Bruxão!</Titulo>
            <Text
              variant="body3"
              styleSheet={{
                marginBottom: '32px',
                color: appConfig.theme.colors.neutrals[300]
              }}
            >
              {appConfig.name}
            </Text>

            <TextField
              value={username}
              onChange={function (event) {
                console.log('usuario digitou', event.target.value)
                // Onde ta o valor?
                const valor = event.target.value
                // Trocar o valor da variavel
                // através do React e avise quem precisa
                setUsername(valor)
              }}
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: 'grey',
                  backgroundColor: appConfig.theme.colors.neutrals[800]
                }
              }}
            />
            <Button
              type="submit"
              label="Entrar"
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals['000'],
                mainColor: 'grey',
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: 'orange'
              }}
            />
          </Box>
          {/* Formulário */}

          {/* Photo Area */}
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              padding: '16px',
              backgroundColor: appConfig.theme.colors.neutrals[800],
              border: '1px solid',
              borderColor: appConfig.theme.colors.neutrals[999],
              borderRadius: '10px',
              flex: 1,
              minHeight: '240px'
            }}
          >
            <Image
              styleSheet={{
                borderRadius: '50%',
                marginBottom: '16px'
              }}
              src={icon}
            />
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: '3px 10px',
                borderRadius: '1000px'
              }}
            >
              {appConfig.name}
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  )
}
