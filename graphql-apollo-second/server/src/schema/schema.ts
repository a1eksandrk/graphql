import { GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLID, GraphQLString, GraphQLInt, GraphQLNonNull } from 'graphql';

import Movie from '../models/movie';
import Director from '../models/director';

type Movie = {
  directorId: string | number
};

type Director = {
  id: string | number
};

const MovieType: GraphQLObjectType = new GraphQLObjectType<Movie>({
  name: 'Movie',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
    genre: { type: new GraphQLNonNull(GraphQLString) },
    director: {
      type: DirectorType,
      resolve(parent) {
        return Director.findById(parent.directorId);
      }
    }
  })
});

const DirectorType: GraphQLObjectType = new GraphQLObjectType<Director>({
  name: 'Director',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
    age: { type: new GraphQLNonNull(GraphQLInt) },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent) {
        return Movie.find({ directorId: parent.id });
      }
    }
  })
});

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve(_, args) {
        return Movie.findById(args.id);
      }
    },
    director: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve(_, args) {
        return Director.findById(args.id);
      }
    },
    movies: {
      type: new GraphQLList(MovieType),
      resolve() {
        return Movie.find({});
      }
    },
    directors: {
      type: new GraphQLList(DirectorType),
      resolve() {
        return Director.find({});
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addDirector: {
      type: DirectorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(_, args) {
        const { name, age } = args;

        const director = new Director({
          name, age,
        });

        return director.save();
      }
    },
    addMovie: {
      type: MovieType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        directorId: { type: GraphQLID }
      },
      resolve(_, args) {
        const { name, genre, directorId } = args;

        const movie = new Movie({
          name, genre, directorId
        });

        return movie.save();
      }
    },
    deleteDirector: {
      type: DirectorType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(_, args) {
        return Director.findByIdAndRemove(args.id);
      }
    },
    deleteMovie: {
      type: MovieType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(_, args) {
        return Movie.findByIdAndRemove(args.id);
      }
    },
    updateDirector: {
      type: DirectorType,
      args: {
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(_, args) {
        const { id, name, age } = args;

        return Director.findByIdAndUpdate(
          id,
          { $set: { name, age }, },
          { new: true }
        );
      }
    },
    updateMovie: {
      type: MovieType,
      args: {
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        directorId: { type: GraphQLID }
      },
      resolve(_, args) {
        const { id, name, age, directorId } = args;

        return Movie.findByIdAndUpdate(
          id,
          { $set: { name, age, directorId }, },
          { new: true }
        );
      }
    }
  }
});

export default new GraphQLSchema({
  query: Query,
  mutation: Mutation
});
