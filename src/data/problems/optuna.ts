import type { Problem } from '../../types'

/**
 * optuna 問題は撤去済み（開発機に optuna が無くローカル検証できないため空にしてある）。
 * サーバー実行(serverOnly)の仕組み自体は残している。復活させる場合は git 履歴の
 * このファイルを参照（GridSampler で決定的に採点する設計だった）。
 * lv160 は純Pythonのグリッドサーチ問題（generated.ts 内）でカバーする。
 */
export const optunaProblems: Problem[] = []
