import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import {
	ArticleParamsForm,
	TFormValue,
} from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [value, setValue] = useState<TFormValue>({
		fontFamily: defaultArticleState.fontFamilyOption,
		fontColor: defaultArticleState.fontColor,
		fontSize: defaultArticleState.fontSizeOption,
		bgColor: defaultArticleState.backgroundColor,
		contentWidth: defaultArticleState.contentWidth,
	});

	console.log('app', value);

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': value.fontFamily.value,
					'--font-size': value.fontSize.value,
					'--font-color': value.fontColor.value,
					'--container-width': value.contentWidth.value,
					'--bg-color': value.bgColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm articleChange={setValue} />
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
