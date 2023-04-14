import React from 'react'
import Head from 'next/head'
import { GiEgyptianBird } from 'react-icons/gi';
import { AiOutlineMail } from 'react-icons/ai'
import { useRouter } from 'next/router'

const Login = () => {

  const router = useRouter()

  // const googleSignin = () => {
  //   signIn('google', {callbackUrl: '/'});
  // }
  const emailSignin = () => {
    router.push("/login")
  }
  const [hasMounted, setHasMounted] = React.useState(false);
  React.useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return null;
  }
  return (
    <>
    <Head>
      <title>Chirper - Login</title>
      <meta name="description" content="Generated by create next app" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <div className='grid grid-col-2'>
      <div className='login_background'>
        <GiEgyptianBird className='text-white text-[200px]'/>
      </div>
      <div className='absolute bottom-20 flex left-0 right-0 mx-auto'>
        {/* <div className='google_sign_in_button' onClick={() => googleSignin()}>
          <div
            className='login_button_text'
          >
            <FcGoogle className='login_button_icon'/>
            Sign In with Google
          </div>
        </div> */}
        <div className='email_sign_in_button' onClick={() => emailSignin()}>
          <div
            className='login_button_text'
          >
            <AiOutlineMail className='login_button_icon'/>
            Login with Email and Password
          </div>
        </div>
        <div className='email_sign_in_button' onClick={() => router.push('/signup')}>
          <div
            className='login_button_text'
          >
            <AiOutlineMail className='login_button_icon'/>
            Sign Up with Email and Password
          </div>
        </div>

      </div>
    </div>
    </>
  )
}

export default Login
