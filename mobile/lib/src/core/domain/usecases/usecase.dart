import 'package:dartz/dartz.dart';
import 'package:equatable/equatable.dart';

import '../errors/failures.dart';

/// Base UseCase — every use case returns Either<Failure, T>
abstract class UseCase<T, Params> {
  Future<Either<Failure, T>> call(Params params);
}

/// For use cases that take no parameters
class NoParams extends Equatable {
  @override
  List<Object?> get props => [];
}
