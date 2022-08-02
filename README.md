# Drunk-Venti-Api

This project was made to create an unofficial API for [paimon.moe](https://paimon.moe) to make a connection with my bot **Drunk Venti**.

## DISCLAIMER
This project runs codes that is remotely fetch from MadeBaruna's Paimon.moe repository, which is absolutely **UNSAFE** !

I however am willing to make such a risky thing as I have trust in his project.

Run it at your own risks.

## Endpoints - /api/

Every single one of the following endpoints have the following queries :
- / : List all the valid names
- /search/[name] : Search the nearest valid names according to you search query
- /[name] : Get infos about the searched object

---

### /api/artifacts/

```typescript
interface Artifact {
  id: string,
  name: string,
  setPiece: [number],
  sets: {
    goblet?: string,
    plume?: string,
    circlet?: string,
    flower?: string,
    sands?: string
  },
  bonuses: [string],
  rarity: [number],
  domain?: string
}
```

### /api/character/
```typescript
interface Character {
  id: string,
  name: string,
  rarity: number,
  weapon: {
    id: string,
    name: string
  },
  stats: {
    hp: number,
    atk: number,
    def: number
  },
  ascensions: [
    {
      items: [
        {
          item: Item,
          amount: number
        }
      ],
      mora: number
    }
  ],
  material: {
    material: [Item]
  },
  book: [Item],
  boss: {
    id: string,
    name: string
  },
  element: Element,
  builds: Build.roles
}
```

### /api/items/

```typescript
// ITEM
interface Item {
  id: string,
  name: string,
  day?: [string],
  rarity?: number,
  parent?: string 
}
```

### /api/weapons
```typescript
// WEAPON
interface Weapon {
  name: string,
  id: string,
  rarity: number,
  atk: number,
  secondary: string,
  type: {
    id: string,
    name: string
  },
  source: string,
  ascension: [
    {
      items: [
        {
          item: Item,
          amount: number
        }
      ],
      mora: number
    }
  ],
  extras: {
    id: string,
    name: string,
    type: string,
    rarity: number,
    description: string,
    skill: {
      name?: string,
      description?: string
    },
    secondary: {
      name?: string,
      stats?: [null|float]
    },
    atk: [null|float]
  }
}
```

---

The following endpoints works a bit differently with no search endpoint

- / : Lists all the valid names
- /[name] : Get infos about the searched object

### /api/builds/

```typescript
// BUILD
interface Build {
  roles: [
    {
      name: string
      recommended: boolean,
      weapons: [{ 
        id: string,
        refine?: number
      }],
      artifacts: [[string]],
      mainStats: {
        sands: [string],
        goblet: [string],
        circlet: [string]
      },
      substats: [string],
      talent: [string],
      tip: string,
      note: string
    }
  ]
}
```
### /api/domains/

```typescript
// DOMAIN
interface Domain {
  id: string,
  domains: [
    {
      s: number,
      id: string,
      name: string,
      ar: number,
      level: number,
      reward: {
        adventureExp: string,
        mora: string,
        friendship: string
      },
      monsters: [
        {
          id: string,
          name: string,
          count: number
        }
      ],
      disorder: [string]
    }
  ],
  artifacts: [string]
}
```

### /api/elements/
```typescript
// ELEMENT
interface Element {
  id: string,
  name: string,
  simpleName: string,
  color: number,
}
```

---

Finally, the following endpoints do not fit in one of the previous categories

### /api/events/

- / : Shows all the events known to date
- /current : Shows the events actually going in the game
- /upcoming : Shows the events that are confirmed and upcoming

```typescript
// EVENT
interface Event {
  name: string,
  pos?: string,
  image?: string,
  start: string,
  end: string,
  color?: string,
  zoom?: string,
  url?: string,
  showOnHome?: boolean,
  timezoneDependent?: boolean
}
```

## Technologies

- NextJS
- Redis