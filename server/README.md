# :desktop_computer: Server

## :briefcase: Stacks

✅ TypeScript
✅ JavaScript
✅ SQL
✅ Fastify

## :hammer: Tools

- Git (`git -v`)
- NodeJs (`node --version`/`npm --version`)
- VS Code
- Extensions: REST Client

## :fire: Run

- Dev Environment: `npm run dev`
- TypeScript Listen: `npx tsx src/server.ts` `tsx watch src/server.ts`
- Database Listen: `npx prisma studio`

## :baby: Created

- Node Project: `npm init -y`
- TypeScript Project: `npx tsc --init`
- Prisma SQLite Project: `npx prisma init --datasource-provider SQLite`
- Migrations Scripts: `npx prisma migrate dev`
- Generator ERD: `npx prisma generate`
- Seed Database: `npx prisma db seed`

## :ok_man: Dependencies

- Dependencies: `npm install fastify @prisma/client @fastify/cors zod dayjs`
- Dev Dependencies: `npm install typescript tsx prisma prisma-erd-generator @mermaid-js/mermaid-cli -D`

## :page_facing_up: Docs

<details>
<summary><b>Regras de negócio</b></summary>

### :bookmark: Funcionalidades

- **Briefing:**
  - Sistema deverá armazenar hábitos com as seguintes informações `título`, `data de criação` e com seu `identificador`
  - Além disso deverá ser capaz de associar o hábito criado a um dia da semana que pode ser `Domingo`, `Segunda-feira`, `Terça-feira`, `Quarta-feira`, `Quinta-feira`, `Sexta-feira` e `Sábado` e cada hábito só poderá ser criado uma única vez no dia da semana
  - A validade do hábito só poderá ocorrer a partir da data de sua criação, desconsiderando a hora
  - O sistema deverá ser capaz de entregar uma lista de dias no início do ano até o momento da consulta para definir as listas de hábitos de cada dia
  - Quando um dia for selecionado deverá se mostrado de forma detalhada todos os hábitos daquele dia da semana, ainda ser possível modificar a conclusão ou não de um hábito somente se o dia selecionar correponder ao mesmo dia da consulta

- **Entidades:**
  - *Habit-Week: OneToMany*
  - *Week-Habit: ManyToOne*

  - Habit:
    - id: string
    - title: string
    - created_at: date

  - Week:
    - id: string
    - week_day: int
    - habit_id: string

  - *Habit-Day: ManyToMany*
  - *Day-Habit: ManyToMany*

  - Day:
    - id: string
    - date: date

  - DayHabit:
    - id: string
    - habit_id: string
    - day_id: string

<details>
