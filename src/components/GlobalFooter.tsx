import { Footer } from "flowbite-react"

const GlobalFooter = () => {
  return (<Footer container={true} className='rounded-none mt-0'>
  <Footer.Copyright
    href="#"
    by="ProvinceWatch"
    year={2023}
  />
  <Footer.LinkGroup>
    <Footer.Link href="https://github.com/ProvinceWatch">
      Github
    </Footer.Link>
  </Footer.LinkGroup>
</Footer>)
}

export default GlobalFooter;