import { Outlet, useNavigation } from 'react-router-dom';
import { Header, Navbar } from '../components';
import Loading from '../components/Loading';

const HomeLayout = () => {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === 'loading';
  return (
    <>
      <Header />
      <Navbar />
      {/* after each link the page will load */}
      {isPageLoading ? (
        <Loading />
      ) : (
        <section className='align-element py-20'>
          <Outlet />
        </section>
      )}
    </>
  );
};
export default HomeLayout;
