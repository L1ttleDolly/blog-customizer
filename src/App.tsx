import { CSSProperties, useState } from 'react';
import {
	ArticleParamsForm,
	TFormValue,
} from 'components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from 'src/constants/articleProps';
import clsx from 'clsx';
import styles from 'src/styles/index.module.scss';
import { Article } from 'components/article';

export const App = () => {
	const [value, setValue] = useState<TFormValue>({
		fontFamily: defaultArticleState.fontFamilyOption,
		fontColor: defaultArticleState.fontColor,
		fontSize: defaultArticleState.fontSizeOption,
		bgColor: defaultArticleState.backgroundColor,
		contentWidth: defaultArticleState.contentWidth,
	});

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
