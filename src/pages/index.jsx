import { Layout } from "../components/layout"
import { MainPage } from "./main"

const PseudoRouter = ({ children }) => {
  return children
}

export const Pages = () => {
  return (
    <Layout>
      <PseudoRouter>
        <MainPage />
      </PseudoRouter>
    </Layout>
  )
}