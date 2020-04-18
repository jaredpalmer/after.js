const HomePage = () => import('./HomePage');
const StartPage = () => import('./StartPage');
const ArticlePage = () => import('./ArticlePage');
const TestPage = () => import('./TestPage');

export function getPageByType(name: string) {
  switch (name) {
    case 'HomePage':
        return HomePage;
    case 'StartPage':
        return StartPage;
    case 'ArticlePage':
        return ArticlePage;
    case 'TestPage':
        return TestPage;
    default: 
        return ArticlePage;
  }
}
