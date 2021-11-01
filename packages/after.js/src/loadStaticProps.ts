import { InitialData } from './types';

const PAGE_DATA_FILE_NAME = 'page-data.json';

// TODO: for better performance we can check
// and see if matchedRoute component have getInitialProps or not
// if the page dose not have a getInitalProps, then page-data.json is empty

/**
 * reads data from pathname/page-data.json file using (fetch method) and then return it
 * @param routes
 * @param pathname
 */
export async function loadStaticProps(
  pathname: string
): Promise<{ data: InitialData }> {
  // in ssg mode there is always a file called page-data.json next to the
  // page path that we have in our app this page-data.json file includes inital data that we need
  // to inject to our components before we render the component
  // if pathname equals "/" we are going to fetch data for https://page-data.json path
  // which is WRONG so we fallback to empty string for index page /page-data.json
  const PAGE_DATA_FILE_PATH = `${
    pathname === '/' ? '' : pathname
  }/${PAGE_DATA_FILE_NAME}`;
  return fetch(PAGE_DATA_FILE_PATH)
    .then(res => res.json())
    .then(res => {
      return { data: res };
    });
}
