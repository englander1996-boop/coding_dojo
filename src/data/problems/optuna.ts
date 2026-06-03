import type { Problem } from '../../types'
import { build } from './_build.ts'

/**
 * ハイパーパラメータ最適化 (optuna) — サーバー実行専用 (serverOnly)。
 * optuna はブラウザ(Pyodide)に無いのでローカル判定APIで動かす。
 * 採点を決定的にするため、乱数に依らない GridSampler(グリッド総当たり)で
 * 必ず最適解に到達するよう設計している。
 */

const lv160 = build(160, 'lv160', [
  {
    title: 'optuna で最小化（GridSampler）',
    concept: 'ハイパーパラメータ最適化',
    tags: ['optuna', '最適化', 'データ分析'],
    serverOnly: true,
    statement:
      '整数 t (0..6) が与えられます。f(x) = (x - t)^2 を、x ∈ {0,1,...,6} の範囲で optuna(GridSampler)を使って最小化し、最適な x を出力してください。\n\n入力例:\n3\n\n出力例:\n3',
    starter: 'import optuna\noptuna.logging.set_verbosity(optuna.logging.WARNING)\nt = int(input())\n',
    hints: [
      'GridSampler は探索空間を総当たりする決定的なサンプラー。',
      'create_study(sampler=GridSampler({"x": list(range(7))}), direction="minimize") → optimize。',
      '答え:\ndef objective(trial):\n    x = trial.suggest_int("x", 0, 6)\n    return (x - t) ** 2\nstudy = optuna.create_study(sampler=optuna.samplers.GridSampler({"x": list(range(7))}), direction="minimize")\nstudy.optimize(objective, n_trials=7)\nprint(study.best_params["x"])',
    ],
    explanation:
      'optuna は「目的関数 objective を最小/最大にするパラメータ」を探すライブラリ。GridSampler はグリッドを全部試すので結果が一意（=採点できる）。\n\n模範解答:\nimport optuna\noptuna.logging.set_verbosity(optuna.logging.WARNING)\nt = int(input())\ndef objective(trial):\n    x = trial.suggest_int("x", 0, 6)\n    return (x - t) ** 2\nstudy = optuna.create_study(sampler=optuna.samplers.GridSampler({"x": list(range(7))}), direction="minimize")\nstudy.optimize(objective, n_trials=7)\nprint(study.best_params["x"])',
    reference:
      'import optuna\noptuna.logging.set_verbosity(optuna.logging.WARNING)\nt = int(input())\ndef objective(trial):\n    x = trial.suggest_int("x", 0, 6)\n    return (x - t) ** 2\nstudy = optuna.create_study(sampler=optuna.samplers.GridSampler({"x": list(range(7))}), direction="minimize")\nstudy.optimize(objective, n_trials=7)\nprint(study.best_params["x"])',
    cases: [
      { input: '3\n', expected: '3', sample: true },
      { input: '0\n', expected: '0' },
      { input: '6\n', expected: '6' },
    ],
    tip: '💡 実務では TPESampler(ベイズ的)で賢く探す。学習用に再現性が要るときは seed や GridSampler を使う。',
  },
  {
    title: '2変数の最適化',
    concept: 'ハイパーパラメータ最適化',
    tags: ['optuna', '最適化', 'データ分析'],
    serverOnly: true,
    statement:
      '2つの目標 tx ty (各 0..3) が空白区切りで与えられます。f(x,y) = (x-tx)^2 + (y-ty)^2 を x,y ∈ {0,1,2,3} で最小化し、最適な x y を空白区切りで出力してください。\n\n入力例:\n1 2\n\n出力例:\n1 2',
    starter: 'import optuna\noptuna.logging.set_verbosity(optuna.logging.WARNING)\ntx, ty = map(int, input().split())\n',
    hints: [
      '探索空間に2つのキーを入れる: {"x":[0,1,2,3], "y":[0,1,2,3]}。',
      'objective 内で suggest_int を2回呼ぶ。',
      '答え:\ndef objective(trial):\n    x = trial.suggest_int("x", 0, 3)\n    y = trial.suggest_int("y", 0, 3)\n    return (x - tx) ** 2 + (y - ty) ** 2\n...GridSampler({"x":[0,1,2,3],"y":[0,1,2,3]})... n_trials=16',
    ],
    explanation:
      '複数パラメータも探索空間に並べるだけ。GridSampler は全組合せ(4×4=16)を試すので最適解が確定する。\n\n模範解答:\nimport optuna\noptuna.logging.set_verbosity(optuna.logging.WARNING)\ntx, ty = map(int, input().split())\ndef objective(trial):\n    x = trial.suggest_int("x", 0, 3)\n    y = trial.suggest_int("y", 0, 3)\n    return (x - tx) ** 2 + (y - ty) ** 2\nspace = {"x": [0, 1, 2, 3], "y": [0, 1, 2, 3]}\nstudy = optuna.create_study(sampler=optuna.samplers.GridSampler(space), direction="minimize")\nstudy.optimize(objective, n_trials=16)\nprint(study.best_params["x"], study.best_params["y"])',
    reference:
      'import optuna\noptuna.logging.set_verbosity(optuna.logging.WARNING)\ntx, ty = map(int, input().split())\ndef objective(trial):\n    x = trial.suggest_int("x", 0, 3)\n    y = trial.suggest_int("y", 0, 3)\n    return (x - tx) ** 2 + (y - ty) ** 2\nspace = {"x": [0, 1, 2, 3], "y": [0, 1, 2, 3]}\nstudy = optuna.create_study(sampler=optuna.samplers.GridSampler(space), direction="minimize")\nstudy.optimize(objective, n_trials=16)\nprint(study.best_params["x"], study.best_params["y"])',
    cases: [
      { input: '1 2\n', expected: '1 2', sample: true },
      { input: '3 0\n', expected: '3 0' },
      { input: '0 3\n', expected: '0 3' },
    ],
    tip: '💡 実際のチューニングでは学習率・木の深さ・正則化など複数のハイパーパラメータを同時に探索する。',
  },
  {
    title: '最大化と best_value',
    concept: 'ハイパーパラメータ最適化',
    tags: ['optuna', '最適化', 'データ分析'],
    serverOnly: true,
    statement:
      '整数 c が与えられます。f(x) = c - (x - 3)^2 を x ∈ {0,...,6} で最大化し、最適な x と最大値を空白区切りで出力してください。\n\n入力例:\n10\n\n出力例:\n3 10',
    starter: 'import optuna\noptuna.logging.set_verbosity(optuna.logging.WARNING)\nc = int(input())\n',
    hints: [
      'direction="maximize" で最大化。',
      'study.best_value で最良の目的関数値が取れる(整数化して出力)。',
      '答え:\nprint(study.best_params["x"], int(study.best_value))',
    ],
    explanation:
      'direction で最小化/最大化を切替。best_params が最適パラメータ、best_value がそのときの目的関数値。\n\n模範解答:\nimport optuna\noptuna.logging.set_verbosity(optuna.logging.WARNING)\nc = int(input())\ndef objective(trial):\n    x = trial.suggest_int("x", 0, 6)\n    return c - (x - 3) ** 2\nstudy = optuna.create_study(sampler=optuna.samplers.GridSampler({"x": list(range(7))}), direction="maximize")\nstudy.optimize(objective, n_trials=7)\nprint(study.best_params["x"], int(study.best_value))',
    reference:
      'import optuna\noptuna.logging.set_verbosity(optuna.logging.WARNING)\nc = int(input())\ndef objective(trial):\n    x = trial.suggest_int("x", 0, 6)\n    return c - (x - 3) ** 2\nstudy = optuna.create_study(sampler=optuna.samplers.GridSampler({"x": list(range(7))}), direction="maximize")\nstudy.optimize(objective, n_trials=7)\nprint(study.best_params["x"], int(study.best_value))',
    cases: [
      { input: '10\n', expected: '3 10', sample: true },
      { input: '5\n', expected: '3 5' },
      { input: '0\n', expected: '3 0' },
    ],
    tip: '💡 best_trial で全情報(params/value/番号)が取れる。study.trials_dataframe() で pandas にも変換できる。',
  },
])

export const optunaProblems: Problem[] = lv160
